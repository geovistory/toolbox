import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfResource, StatementWithTarget, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

type ItemType = 'preview' | 'nested' | 'timePrimitive' | 'value';

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
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>

  @Input() allowMultiSelect: boolean;
  @Input() checked: boolean
  @Output() selectionChange = new EventEmitter<StatementWithTarget>()

  itemType: ItemType
  constructor(
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
    private p: ActiveProjectService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.itemType = this.getItemType(this.field, this.item)
  }
  getItemType(field: Field, item: StatementWithTarget): ItemType {
    if (field.targets[item.targetClass]?.viewType?.entityPreview || field.targets[item.targetClass]?.viewType?.typeItem) {
      return 'preview'
    }
    if (item.target.entity) return 'nested'
    if (item.target.timePrimitive) return 'timePrimitive'
    return 'value'
  }
  remove() {
    if (this.field.identityDefiningForSource && this.field.isOutgoing) {
      alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.')
    } else {
      this.ap.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        const statement = this.item.statement;
        this.dataService.removeInfEntitiesFromProject([statement.pk_entity], pkProject)

      })
    }
  }

  openPopup() {
    const data: ConfirmDialogData = {
      hideNoButton: true,
      noBtnText: '',
      yesBtnText: 'Ok',
      title: 'Details',
      paragraphs: [this.item.targetLabel]
    }
    this.dialog.open(ConfirmDialogComponent, { data })
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
  removeEntity() {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      // remove the related temporal entity
      this.p.removeEntityFromProject(this.item.target.entity.resource.pk_entity, () => {
        // remove the statement
        this.dataService.removeInfEntitiesFromProject([this.item.statement.pk_entity], pkProject)
      })
    })

  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
