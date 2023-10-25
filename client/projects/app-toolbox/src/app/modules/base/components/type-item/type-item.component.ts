import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { GvFieldTargets, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, InfStatement, InfStatementWithRelations } from '@kleiolab/lib-sdk-lb4';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gv-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss']
})
export class TypeItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @Input() pkEntity: number
  @Input() pkProperty: number
  @Input() pkTypeClass: number
  @Input() pkTypedClass: number
  @Input() isOutgoing: boolean
  @Input() loadOnInit = true
  @Input() keepPageUntil$: Observable<any> // if provided, this is used as takeUntil for the pageLoader

  isViewMode: boolean;

  hasTypeStmt$: Observable<InfStatement | undefined>
  pkType$: Observable<number | undefined>
  typeLabel$: Observable<string>

  formGroup: UntypedFormGroup;
  editing: boolean;
  loading: boolean;
  assigningValue: boolean
  constructor(
    private i: InformationPipesService,
    private fb: UntypedFormBuilder,
    private pag: PaginationService,
    private state: StateFacade
  ) {
    this.formGroup = this.fb.group({
      'typeCtrl': new UntypedFormControl()
    })
    this.formGroup.get('typeCtrl').valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (!this.assigningValue) this.onSubmit()
    })
  }

  ngOnInit() {
    if (!this.pkEntity) throw new Error('You must provide a pkEntity')
    if (!this.pkProperty) throw new Error('You must provide a pkProperty')
    if (!this.pkTypeClass) throw new Error('You must provide a pkTypeClass')
    if (!this.pkTypedClass) throw new Error('You must provide a pkTypedClass')
    if (this.isOutgoing == undefined) throw new Error('You must provide a isOutgoing')
    if (this.loadOnInit == undefined) this.loadOnInit = true

    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const fieldPage: GvFieldPage = {
        isOutgoing: this.isOutgoing,
        property: { fkProperty: this.pkProperty },
        scope: { inProject: pkProject },
        source: { fkInfo: this.pkEntity },
        limit: 1,
        offset: 0
      }
      const targets: GvFieldTargets = { [this.pkTypeClass]: { entityPreview: 'true' } }
      const fieldPageReq: GvFieldPageReq = {
        page: fieldPage,
        pkProject,
        targets
      }

      if (this.loadOnInit) {
        this.pag.addPageLoader(fieldPageReq, this.keepPageUntil$ ?? this.destroy$)
        // if (this.isOutgoing) this.p.inf.statement.findByParams(true, pkProject, null, null, this.pkEntity, this.pkProperty)
        // else this.p.inf.statement.findByParams(true, pkProject, null, this.pkEntity, null, this.pkProperty)
      }

      const fp$ = this.i.pipeFieldPage(fieldPage, targets, false)

      // take the first statementWithTarget of page as the has-type-stmt
      const hasTypeStmtWt$ = fp$.pipe(
        map(fp => fp.statements.length ? fp.statements[0] : undefined),
        shareReplay()
      )

      this.hasTypeStmt$ = hasTypeStmtWt$.pipe(
        map(swt => {
          try {
            return swt.statement
          } catch (e) {
            return undefined
          }
        })
      )

      this.pkType$ = hasTypeStmtWt$.pipe(
        map(swt => {
          try {
            return swt.target.entity.entityPreview.pk_entity
          } catch (e) {
            return undefined
          }
        })
      )

      this.typeLabel$ = hasTypeStmtWt$.pipe(
        map(swt => {
          try {
            return swt.target.entity.entityPreview.entity_label
          } catch (e) {
            return undefined
          }
        })
      )
      // this.i.pipeTypeOfEntity(this.pkEntity, this.pkProperty, this.isOutgoing)

      // this.pkType$ = this.hasTypeStatement$.pipe(
      //   map(e => e ? (this.isOutgoing ? e.fk_object_info : e.fk_subject_info) : undefined)
      // )
      // this.typeLabel$ = this.pkType$.pipe(
      //   switchMap(pkType => this.ap.streamEntityPreview(pkType).pipe(
      //     map(preview => preview.entity_label)
      //   ))
      // )
      this.pkType$.pipe(takeUntil(this.destroy$)).subscribe(pkType => {
        this.assigningValue = true
        this.formGroup.get('typeCtrl').setValue(pkType, { emitEvent: false, onlySelf: true })
        this.assigningValue = false
      })
    })
  }

  onSubmit() {
    combineLatest(this.hasTypeStmt$, this.state.pkProject$).pipe(
      first(),
      takeUntil(this.destroy$)
    ).subscribe(([statement, fk_project]) => {
      const targetEntity: number = this.formGroup.get('typeCtrl').value;
      // if same option is chosen or subject equals object...
      if (
        (statement && targetEntity == (this.isOutgoing ? statement.fk_object_info : statement.fk_subject_info)) ||
        (!statement && !targetEntity)
      ) {
        // ... stop here.
        this.editing = false
      }
      // if another option is chosen
      else {
        this.loading = true

        // old statement
        const calls$ = [];
        if (statement) {
          // remove old statement from project
          const oldStatement: InfStatementWithRelations = {
            pk_entity: statement.pk_entity,
            fk_subject_info: statement.fk_subject_info,
            fk_object_info: statement.fk_object_info,
            fk_property: statement.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            }]
          }
          const call$ = this.state.data.removeInfEntitiesFromProject([oldStatement.pk_entity], fk_project)
          calls$.push(call$);
        }

        if (targetEntity) {
          // create and persist new statement
          const subject = this.isOutgoing ? this.pkEntity : targetEntity;
          const object = this.isOutgoing ? targetEntity : this.pkEntity;

          const newStmt: InfStatementWithRelations = {
            fk_subject_info: subject,
            fk_object_info: object,
            fk_property: this.pkProperty,
            entity_version_project_rels: [{ is_in_project: true }]
          }
          const call$ = this.state.data.upsertInfStatementsWithRelations(fk_project, [newStmt])
          calls$.push(call$);
        }

        combineLatest(calls$).pipe(first(), takeUntil(this.destroy$)).subscribe(resolved => {
          this.editing = false
          this.loading = false
        })
      }

    })

  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
