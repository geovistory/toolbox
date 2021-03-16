import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassAndTypePk, ConfigurationPipesService, Field, FieldTargetClass } from '@kleiolab/lib-queries';
import { InfStatement, InfTemporalEntityApi } from '@kleiolab/lib-sdk-lb3';
import { GvFieldPageReq, GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets, isValueObjectSubfield } from '../../base.helpers';
import { NotInProjectClickBehavior } from '../add-or-create-entity-dialog/add-or-create-entity-dialog.component';

type ActiveElement = 'add-existing-statements' | 'create-form' | 'create-or-add'

export interface AddDialogData {
  field: Field;
  targetClass: number

  // primary key of the source entity
  pkEntity: number;
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

  fieldWithOneTarget: Field
  fieldTargetClass: FieldTargetClass

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
    public teEnApi: InfTemporalEntityApi,
    public paginationApi: SubfieldPageControllerService
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
          page: fieldToFieldPage(this.fieldWithOneTarget, this.data.pkEntity, { notInProject: pkProject }, 0, 0)
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

  onClose() {
    this.dialogRef.close()
  }
  onNext() {

    const isValueLike = isValueObjectSubfield(this.fieldTargetClass.listType)

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
      r.fk_subject_info = this.data.pkEntity
      r.fk_object_info = pkEntity
    } else {
      r.fk_object_info = this.data.pkEntity
      r.fk_subject_info = pkEntity
    }
    r.fk_property = f.property.pkProperty;
    r.fk_property_of_property = f.property.pkPropertyOfProperty;


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
        const obs$: Observable<any>[] = [this.p.inf.statement.upsert([r], pkProject).resolved$.pipe(first(x => !!x))]

        if (!isInProject && model == 'temporal_entity') {
          // crate api call for adding teEnToProject


          const apiCall = this.p.addEntityToProject(pkEntity)
          obs$.push(apiCall)
        }

        combineLatest(obs$).subscribe(x => {
          this.dialogRef.close()
        });
      })

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
