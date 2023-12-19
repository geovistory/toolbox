import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfResource, StatementWithTarget, WarEntityPreview, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { C_53_TYPE_ID } from '../../../../ontome-ids';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate/truncate.pipe';
import { fieldToWarFieldChangeId } from '../../base.helpers';
import { openAddStatementDialog } from '../../lib/openAddStatementDialog';
import { PaginationService } from '../../services/pagination.service';
import { ViewFieldDropListService } from '../../services/view-field-drop-list.service';
import { EditTextDialogComponent, EditTextDialogData } from '../edit-text-dialog/edit-text-dialog.component';
import { ViewFieldBodyService } from '../view-field-body/view-field-body.service';
import { ViewFieldItemCellComponent } from '../view-field-item-cell/view-field-item-cell.component';
import { ViewFieldItemContentSectionComponent } from '../view-field-item-content-section/view-field-item-content-section.component';
import { ViewFieldItemLayoutComponent } from '../view-field-item-layout/view-field-item-layout.component';
import { ViewFieldItemNestedComponent } from '../view-field-item-nested/view-field-item-nested.component';
import { ViewFieldItemPreviewHasTypeComponent } from '../view-field-item-preview-has-type/view-field-item-preview-has-type.component';
import { ViewFieldItemPreviewPlatformVocabularyComponent } from '../view-field-item-preview-platform-vocabulary/view-field-item-preview-platform-vocabulary.component';
import { ViewFieldItemPreviewComponent } from '../view-field-item-preview/view-field-item-preview.component';
import { ViewFieldItemTimePrimitiveComponent } from '../view-field-item-time-primitive/view-field-item-time-primitive.component';
import { ViewFieldItemValueVersionComponent } from '../view-field-item-value-version/view-field-item-value-version.component';
import { ViewFieldItemValueComponent } from '../view-field-item-value/view-field-item-value.component';
import { VIEW_FIELD_ITEM_TYPE } from './VIEW_FIELD_ITEM_TYPE';
import { ViewFieldItemService } from './view-field-item.service';
export type ViewFieldItemTypeFn = (field: Field, stmtWT: StatementWithTarget) => ViewFieldItemType | undefined
export type ViewFieldItemType =
  'preview' // a normal entity, that can be in the project or not
  | 'preview-platform-vocabulary' // a platform vocabulary entity, that is never in the project (and thus readonly)
  | 'preview-has-type' // the target of a has type field with adapted ui to select amongst types available in project
  | 'nested'
  | 'timePrimitive'
  | 'value'
  | 'valueVersion'
  | 'cell'
  | 'content-tree';

@Component({
  selector: 'gv-view-field-item',
  templateUrl: './view-field-item.component.html',
  styleUrls: ['./view-field-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [ViewFieldItemService, TruncatePipe],
  imports: [ViewFieldItemLayoutComponent, NgIf, ViewFieldItemPreviewComponent, ViewFieldItemPreviewPlatformVocabularyComponent, ViewFieldItemPreviewHasTypeComponent, ViewFieldItemNestedComponent, ViewFieldItemTimePrimitiveComponent, ViewFieldItemCellComponent, ViewFieldItemValueComponent, ViewFieldItemValueVersionComponent, ViewFieldItemContentSectionComponent]
})
export class ViewFieldItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() item: StatementWithTarget
  @Input() field: Field
  @Input() scope: GvFieldPageScope
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>

  @Input() allowMultiSelect: boolean;
  @Input() checked: boolean
  @Output() selectionChange = new EventEmitter<StatementWithTarget>()

  itemType: ViewFieldItemType
  constructor(
    private state: StateFacade,
    private ap: ActiveProjectPipesService,
    private p: ActiveProjectService,
    private dialog: MatDialog,
    private truncatePipe: TruncatePipe,
    private paginationService: PaginationService,
    viewFieldItemService: ViewFieldItemService,
    @Optional() private fieldDropService: ViewFieldDropListService,
    @Optional() @Inject(VIEW_FIELD_ITEM_TYPE) private itemTypeOverride: ViewFieldItemTypeFn,
    @Optional() public fieldBody: ViewFieldBodyService,

  ) { viewFieldItemService.registerComponent(this) }

  ngOnInit(): void {
    this.itemType = this.getItemType(this.field, this.item)
  }
  getItemType(field: Field, item: StatementWithTarget): ViewFieldItemType {
    if (this.itemTypeOverride) {
      const override = this.itemTypeOverride(field, item)
      if (override) return override
    }
    if (item.target.entity) {
      if (field.targets[item.targetClass]?.viewType?.entityPreview) {

        if (this.ap.getIsPlatformVocabClass(item.targetClass)) return 'preview-platform-vocabulary'

        if (this.ap.getIsSubclassOf(item.targetClass, C_53_TYPE_ID)) return 'preview-has-type'

        return 'preview'
      }
      return 'nested'
    }
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
  openEditValueDialog(initVal: StatementWithTarget) {
    openAddStatementDialog(
      this.dialog,
      {
        field: this.field,
        showAddList: false,
        source: this.fieldBody.component.source,
        targetClass: initVal.targetClass,
        hiddenProperty: {},
        toBeReplaced: initVal
      })
  }
  openEditTextDialog() {
    const data: EditTextDialogData = {
      classLabel: this.field.targets[this.item.targetClass].targetClassLabel,
      field: this.field,
      scope: this.scope,
      source: { fkInfo: this.item.target.entity.resource.pk_entity },
      editing$: new BehaviorSubject(true),
      editMode: true,
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
      editMode: false,
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
    this.movePosition(1)
    // this.p.pkProject$.pipe(first()).subscribe(pkProject => {
    //   this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, this.item.statement.pk_entity, this.item.isOutgoing)
    // })
  }

  async movePosition(targetOrdNum: number) {
    this.fieldDropService.moveInSameFieldBackend(
      this.field,
      this.fieldBody.component.source,
      this.scope,
      targetOrdNum,
      this.item.statement.pk_entity
    )
  }


  async remove() {
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise();

    if (this.field.identityDefiningForSource) {
      return await this.displayNotRemovableWarning();
    }

    const sourceLabel = await this.getSourceEntityLabel()
    const fieldLabel = this.getFieldLabel()
    const targetLabel = await this.getTargetEntityLabel()
    const pkStatement = this.item.statement.pk_entity

    let reloadNeeded = false;

    if (this.field.identityDefiningForTarget) {
      const pkEntity = this.item.target.entity.resource.pk_entity
      reloadNeeded = await this.p.openRemoveStatementAndEntityDialog(
        sourceLabel,
        fieldLabel,
        targetLabel,
        pkStatement,
        pkEntity
      )
    }
    else {
      const targetIsLiteral = !this.item.target.entity
      reloadNeeded = await this.p.openRemoveStatementDialog(
        sourceLabel,
        fieldLabel,
        targetLabel,
        pkStatement,
        targetIsLiteral
      )
    }

    if (reloadNeeded) this.triggerPageReloads(pkProject, this.fieldBody.component.source.fkInfo, this.field)
    return undefined
  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, { fkInfo }, field.property, field.isOutgoing);
    this.paginationService.reloadPagesOfField(fieldId);
  }


  async displayNotRemovableWarning() {
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise();
    const pkEntity = this?.fieldBody?.component?.source?.fkInfo;
    if (pkEntity) {
      const ep = await this.ap.streamEntityPreview(pkEntity, true, pkProject).pipe(first()).toPromise();

      if (ep) {

        alert(`Item can not be removed, since it is defining the identity of "${ep.class_label} – ${ep.entity_label}". You might want to edit or delete the "${ep.class_label} – ${ep.entity_label}".`);
      }
    }
    return false;
  }


  async getSourceEntityLabel() {
    const classLabel = this.field.sourceClassLabel
    const ep = await this.ap.streamEntityPreview(this.fieldBody.component.source.fkInfo).pipe(first()).toPromise()
    return this.getEntityLabel(classLabel, ep.entity_label)
  }
  async getTargetEntityLabel() {
    const classLabel = this.field.targets[this.item.targetClass].targetClassLabel
    let entityLabel: string
    if (this.item.target.entity) {
      const ep = await this.ap.streamEntityPreview(this.item.target.entity.resource.pk_entity).pipe(first()).toPromise()
      entityLabel = ep.entity_label
    }
    else {
      entityLabel = this.item.targetLabel
    }
    return this.getEntityLabel(classLabel, entityLabel)
  }

  getEntityLabel(classLabel: string, entityLabel: string) {
    const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['15']);
    const trucatedEntityLabel = this.truncatePipe.transform(entityLabel, ['15']);
    return [trucatedClassLabel, trucatedEntityLabel].filter(i => !!i).join(' – ')
  }

  getFieldLabel() {
    return this.field.label;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
