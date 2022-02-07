import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfResource, StatementWithTarget, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ViewFieldDropListService } from '../../services/view-field-drop-list.service';
import { EditTextDialogComponent, EditTextDialogData } from '../edit-text-dialog/edit-text-dialog.component';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { VIEW_FIELD_ITEM_TYPE } from './VIEW_FIELD_ITEM_TYPE';
export type ViewFieldItemTypeFn = (field: Field, stmtWT: StatementWithTarget) => ViewFieldItemType | undefined
export type ViewFieldItemType = 'preview' | 'nested' | 'timePrimitive' | 'value' | 'valueVersion' | 'cell' | 'content-tree';

@Component({
  selector: 'gv-view-field-item',
  templateUrl: './view-field-item.component.html',
  styleUrls: ['./view-field-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() item: StatementWithTarget
  @Input() field: Field
  @Input() scope: GvFieldPageScope
  @Input() readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>

  @Input() allowMultiSelect: boolean;
  @Input() checked: boolean
  @Output() selectionChange = new EventEmitter<StatementWithTarget>()

  itemType: ViewFieldItemType
  constructor(
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
    private p: ActiveProjectService,
    private dialog: MatDialog,
    @Optional() private fieldDropService: ViewFieldDropListService,
    @Optional() @Inject(VIEW_FIELD_ITEM_TYPE) private itemTypeOverride: ViewFieldItemTypeFn,
    @Optional() private fieldBody: ViewFieldBodyComponent,

  ) { }

  ngOnInit(): void {
    this.itemType = this.getItemType(this.field, this.item)
  }
  getItemType(field: Field, item: StatementWithTarget): ViewFieldItemType {
    if (this.itemTypeOverride) {
      const override = this.itemTypeOverride(field, item)
      if (override) return override
    }
    if (field.targets[item.targetClass]?.viewType?.entityPreview || field.targets[item.targetClass]?.viewType?.typeItem) {
      return 'preview'
    }
    if (item.target.entity) return 'nested'
    if (item.target.timePrimitive) return 'timePrimitive'
    if (item.target.cell) return 'cell'
    return 'value'
  }

  openPopup(string: string) {
    const data: ConfirmDialogData = {
      hideNoButton: true,
      noBtnText: '',
      yesBtnText: 'Ok',
      title: 'Details',
      paragraphs: [string]
    }
    this.dialog.open(ConfirmDialogComponent, { data })
  }

  openEditTextDialog() {
    const data: EditTextDialogData = {
      classLabel: this.field.targets[this.item.targetClass].targetClassLabel,
      field: this.field,
      scope: this.scope,
      source: { fkInfo: this.item.target.entity.resource.pk_entity },
      editing$: new BehaviorSubject(true),
      readmode$: of(false),
      showOntoInfo$: of(false),
    }
    this.dialog.open(EditTextDialogComponent, { data })
  }

  openViewTextDialog() {
    const data: EditTextDialogData = {
      classLabel: this.field.targets[this.item.targetClass].targetClassLabel,
      field: this.field,
      scope: this.scope,
      source: { fkInfo: this.item.target.entity.resource.pk_entity },
      editing$: new BehaviorSubject(false),
      readmode$: of(true),
      showOntoInfo$: of(false),
    }
    this.dialog.open(EditTextDialogComponent, { data })
  }


  openInNewTabFromEntity(e: InfResource) {
    this.p.addEntityTab(e.pk_entity, e.fk_class)
  }
  openInNewTabFromPreview(e: WarEntityPreview) {
    this.p.addEntityTab(e.pk_entity, e.fk_class)
  }

  addAndOpenInNewTabFromEntity(e: InfResource) {
    this.addAndOpenInNewTab(e.pk_entity, e.fk_class)
  }
  addAndOpenInNewTabFromPreview(e: WarEntityPreview) {
    this.addAndOpenInNewTab(e.pk_entity, e.fk_class)
  }
  private addAndOpenInNewTab(pkEntity: number, fkClass: number) {
    this.p.addEntityToProject(pkEntity, () => {
      this.p.addEntityTab(pkEntity, fkClass)
    })
  }


  markAsFavorite() {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, this.item.statement.pk_entity, this.item.isOutgoing)
    })
  }

  async movePosition(targetOrdNum: number) {
    this.fieldDropService.moveInSameFieldBackend(targetOrdNum, this.item.statement.pk_entity,)
  }

  async remove() {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();

    if (this.field.identityDefiningForSource) {
      return await this.displayNotRemovableWarning(pkProject);
    }

    if (this.field.identityDefiningForTarget) {
      this.removeEntity(pkProject)
    }
    else {
      this.removeStatement(pkProject);
    }

  }


  private async displayNotRemovableWarning(pkProject: number) {
    const pkEntity = this?.fieldBody?.source?.fkInfo;
    if (pkEntity) {
      const ep = await this.ap.streamEntityPreview(pkEntity, true, pkProject).pipe(first()).toPromise();

      if (ep) {

        alert(`Item can not be removed, since it is defining the identity of "${ep.class_label} – ${ep.entity_label}". You might want to edit or delete the "${ep.class_label} – ${ep.entity_label}".`);
      }
    }
    return false;
  }

  private removeStatement(pkProject: number) {
    const statement = this.item.statement;
    this.dataService.removeInfEntitiesFromProject([statement.pk_entity], pkProject);
  }

  private removeEntity(pkProject: number) {
    // remove the related temporal entity
    this.p.removeEntityFromProject(this.item.target.entity.resource.pk_entity, () => {
      // remove the statement
      this.dataService.removeInfEntitiesFromProject([this.item.statement.pk_entity], pkProject)
    })

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
