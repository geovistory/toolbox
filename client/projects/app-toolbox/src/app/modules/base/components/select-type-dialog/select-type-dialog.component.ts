import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, InfStatementWithRelations, StatementWithTarget, WarEntityPreview, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, sortAbc } from '@kleiolab/lib-utils';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { fieldToWarFieldChangeId } from '../../base.helpers';
import { BaseModalsService } from '../../services/base-modals.service';
import { EditModeService } from '../../services/edit-mode.service';
import { PaginationService } from '../../services/pagination.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';

export interface SelectTypeDialogData {

  targetClass: number;

  field: Field;

  // statement to be replaced
  originalStatement?: StatementWithTarget

  // key of the source entity
  source: GvFieldSourceEntity;
}
interface Option {
  id: number;
  label: string
}
@Component({
  selector: 'gv-select-type-dialog',
  templateUrl: './select-type-dialog.component.html',
  styleUrls: ['./select-type-dialog.component.scss'],
  providers: [
    EditModeService,
    { provide: READ_ONLY, useValue: true }
  ]
})
export class SelectTypeDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  loading$ = new BehaviorSubject(false);
  options$: Observable<Option[]>
  filter$ = new BehaviorSubject<string>('')

  constructor(
    private dataService: ReduxMainService,
    private paginationService: PaginationService,
    private dialogs: BaseModalsService,
    @Inject(MAT_DIALOG_DATA) public data: SelectTypeDialogData,
    private ap: ActiveProjectPipesService,
    public dialogRef: MatDialogRef<SelectTypeDialogComponent, boolean>,
    private schema: SchemaSelectorsService
  ) { }

  ngOnInit() {
    const allOptions$ = this.schema.inf$.resource$.by_fk_class_key$(this.data.targetClass).pipe(
      switchMap(r => combineLatestOrEmpty(
        values(r).map(resource => this.ap.streamEntityPreview(resource.pk_entity).pipe(
          map<WarEntityPreview, Option>(preview => ({
            label: preview.entity_label,
            id: resource.pk_entity
          }))
        ))
      ).pipe(
        sortAbc(node => node.label)
      )),
    )

    this.options$ = combineLatest([allOptions$, this.filter$]).pipe(
      map(([allOptions, filter]) => {
        if (filter.length === 0) return allOptions
        return allOptions.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()))
      }),
    )
  }





  /**
   * upserts a statement, where the selected existing entity is the target
   * @param targetEntity
   */
  async upsertSelected(targetEntity: number) {
    this.loading$.next(true)
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise()

    // create the statement to add
    const newStmt = this.prepareNewStatement(targetEntity);

    // remove original statement, if provided
    await this.removeOriginalStatement()

    if (this.data?.originalStatement?.statement?.pk_entity) {
      // add the ord-num to the new statement, to keep its position
      newStmt.entity_version_project_rels = this.data.field.isOutgoing ?
        [{ ord_num_of_range: this.data.originalStatement.ordNum }] :
        [{ ord_num_of_domain: this.data.originalStatement.ordNum }]
    }

    // upsert new statement
    await this.dataService.upsertInfStatementsWithRelations(pkProject, [newStmt])
      .pipe(first()).toPromise();

    this.triggerPageReloads(this.data.source.fkInfo, this.data.field)
    this.dialogRef.close(true)
  }


  private prepareNewStatement(targetEntity: number) {
    const r: Partial<InfStatementWithRelations> = {};
    if (this.data.field.isOutgoing) {
      r.fk_subject_info = this.data.source.fkInfo;
      r.object_resource = { pk_entity: targetEntity, fk_class: this.data.targetClass };
    } else {
      r.fk_object_info = this.data.source.fkInfo;
      r.subject_resource = { pk_entity: targetEntity, fk_class: this.data.targetClass };
    }
    r.fk_property = this.data.field.property.fkProperty;
    r.fk_property_of_property = this.data.field.property.fkPropertyOfProperty;
    return r;
  }

  private async triggerPageReloads(fkInfo: number, field: Field) {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise()
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, { fkInfo }, field.property, field.isOutgoing);
    this.paginationService.reloadPagesOfField(fieldId);
  }

  async openAdvancedDialog() {
    this.loading$.next(true)

    const dataModified = await this.dialogs.openAddStatementDialogFromField(
      this.data.source,
      this.data.field,
      this.data.targetClass,
      this.data.originalStatement
    ).afterClosed().toPromise();

    await this.removeOriginalStatement();

    this.triggerPageReloads(this.data.source.fkInfo, this.data.field)
    this.dialogRef.close(dataModified)
  }

  private async removeOriginalStatement() {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();
    if (this.data?.originalStatement?.statement?.pk_entity) {
      await this.dataService.removeEntityFromProject(
        pkProject,
        this.data.originalStatement.statement.pk_entity
      ).pipe(first()).toPromise();
    }
  }

  onFilter(e: KeyboardEvent) {
    this.filter$.next((<HTMLInputElement>e.target).value)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}