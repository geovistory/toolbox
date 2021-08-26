import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassAndTypePk, ConfigurationPipesService, Field, FieldTargetClass } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity, GvSchemaModifier, InfStatementWithRelations, SubfieldPageControllerService, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets, fieldToWarFieldChangeId, isValueObjectSubfield } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { NotInProjectClickBehavior } from '../add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { FormCreateEntityComponent, FormCreateEntityValue } from '../form-create-entity/form-create-entity.component';

type ActiveElement = 'add-existing-statements' | 'create-form' | 'create-or-add'

export interface AddDialogData {
  field: Field;
  targetClass: number

  // primary key of the source entity
  source: GvFieldSourceEntity;
}

@Component({
  selector: 'gv-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  activeElement$ = new BehaviorSubject<ActiveElement>('add-existing-statements')
  showOntoInfo$ = new BehaviorSubject(false)
  readonly$ = new BehaviorSubject(false)
  addMode$ = new BehaviorSubject(true)
  scope$: Observable<GvFieldPageScope>

  searchString$ = new Subject<string>();

  classAndTypePk: ClassAndTypePk;
  alreadyInProjectBtnText: string;
  notInProjectBtnText: string;
  notInProjectClickBehavior: NotInProjectClickBehavior;

  loading$ = new BehaviorSubject(false);
  notInProjectCount$ = new Observable<number>();
  saving = false;

  fieldWithOneTarget: Field
  fieldTargetClass: FieldTargetClass

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
    public paginationApi: SubfieldPageControllerService,
    private dataService: ReduxMainService,
    private paginationService: PaginationService
  ) {

    this.scope$ = this.p.pkProject$.pipe(map(pkProject => ({ notInProject: pkProject })))

    this.classAndTypePk = { pkClass: data.targetClass, pkType: undefined }
    this.alreadyInProjectBtnText = 'Select'
    this.notInProjectBtnText = 'Add and Select'
    this.notInProjectClickBehavior = 'selectOnly'

    /**
     * restrict the add dialog to only one class
     */
    this.fieldTargetClass = this.data.field.targets[this.data.targetClass]
    if (!this.fieldTargetClass) throw new Error('target type is not retrievable for class: ' + this.data.targetClass);

    this.fieldWithOneTarget = {
      ...this.data.field,
      targets: {
        [this.data.targetClass]: this.fieldTargetClass
      }
    }

  }

  ngOnInit() {
    // get count from rest api first
    this.notInProjectCount$ = this.p.pkProject$.pipe(
      first(),
      switchMap(pkProject => {
        const req: GvFieldPageReq = {
          pkProject,
          targets: fieldToGvFieldTargets(this.fieldWithOneTarget),
          page: fieldToFieldPage(this.fieldWithOneTarget, this.data.source, { notInProject: pkProject }, 0, 0)
        }
        return this.paginationApi.subfieldPageControllerLoadSubfieldPage(req).pipe(
          map(res => res.subfieldPages[0].count)
        )
      }),
      shareReplay()
    )
    this.notInProjectCount$.pipe(first()).subscribe(count => {
      if (count === 0) this.onNext()
    })
  }

  onFormOk(createEntity: FormCreateEntityComponent) {
    createEntity.submitted = true
    if (createEntity.formFactory.formGroup.valid) {
      this.p.dfh$.class$.by_pk_class$.key(this.classAndTypePk.pkClass).pipe(
        first(i => !!i)
      ).subscribe((klass) => {
        const value: FormCreateEntityValue = createEntity.formFactory.formGroupFactory.valueChanges$.value

        // field + source to create the wrapper statement
        const data = this.data
        const item = value

        // assign property
        const statement: InfStatementWithRelations = {
          ...item.statement,
          fk_property: data.field.property.fkProperty,
          fk_property_of_property: data.field.property.fkPropertyOfProperty,
        }

        // assign the pkSource of the wrapping entity
        if (data.field.isOutgoing) {
          // assign subject
          statement.fk_subject_info = data.source.fkInfo;
          statement.fk_subject_data = data.source.fkData;
          statement.fk_subject_tables_cell = data.source.fkTablesCell;
          statement.fk_subject_tables_row = data.source.fkTablesRow;
          // here we are assigning the object
          if (item.resource) statement.object_resource = item.resource
        } else {
          // assign object
          statement.fk_object_info = data.source.fkInfo;
          statement.fk_object_data = data.source.fkData;
          statement.fk_object_tables_cell = data.source.fkTablesCell;
          statement.fk_object_tables_row = data.source.fkTablesRow;
          // here we are assigning the subject
          if (item.resource) statement.subject_resource = item.resource
        }

        // from onSaved()
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
          const fkInfo = this.data.source.fkInfo;
          const field = this.data.field;

          // send the statement with the wrapped resource, and wait for response

          this.saving = true;

          this.dataService.upsertInfStatementsWithRelations(pkProject, [statement])
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: GvSchemaModifier) => {
              if (res) {
                this.saving = false;

                this.triggerPageReloads(pkProject, fkInfo, field);
                this.dialogRef.close();
              }
            })
        })

      })
    } else {
      const f = createEntity.formFactory.formGroup.controls.childControl as FormArray;
      U.recursiveMarkAsTouched(f)
    }
  }
  onClose() {
    this.dialogRef.close()
  }
  onNext() {

    const isValueLike = isValueObjectSubfield(this.fieldTargetClass.viewType)

    if (isValueLike || this.fieldWithOneTarget.identityDefiningForTarget) {
      this.activeElement$.next('create-form')
    }
    else {
      this.activeElement$.next('create-or-add')
    }
  }
  onSelected(pkEntity: number, isInProject: boolean) {
    const f = this.fieldWithOneTarget;

    this.loading$.next(true)

    // create the statement to add
    const r: Partial<InfStatement> = {}
    if (f.isOutgoing) {
      r.fk_subject_info = this.data.source.fkInfo
      r.fk_object_info = pkEntity
    } else {
      r.fk_object_info = this.data.source.fkInfo
      r.fk_subject_info = pkEntity
    }
    r.fk_property = f.property.fkProperty;
    r.fk_property_of_property = f.property.fkPropertyOfProperty;


    combineLatest(
      this.p.pkProject$,
      this.c.pipeTableNameOfClass(this.data.targetClass)
    )
      .pipe(
        first(([pk, model]) => (!!pk && !!model)),
        takeUntil(this.destroy$)
      )
      .subscribe(([pkProject, model]) => {

        // create api call for upserting the statement
        const obs$: Observable<any>[] = [this.dataService.upsertInfStatementsWithRelations(pkProject, [r])]

        if (!isInProject && model == 'resource') {
          // crate api call for adding teEnToProject


          const apiCall = this.p.addEntityToProject(pkEntity)
          obs$.push(apiCall)
        }
        combineLatest(obs$)
          .subscribe(x => {
            const fkInfo = this.data.source.fkInfo;
            const field = this.data.field;
            this.triggerPageReloads(pkProject, fkInfo, field);
            this.dialogRef.close()
          });
      })

  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, fkInfo, field);
    this.paginationService.reloadPagesOfField(fieldId);
  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
