import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActiveProjectPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { InfActions } from '@kleiolab/lib-redux';
import { InfStatement, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';

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

  isViewMode: boolean;

  hasTypeStatement$: Observable<InfStatement>
  pkType$: Observable<number>
  typeLabel$: Observable<string>

  formGroup: FormGroup;
  editing: boolean;
  loading: boolean;
  assigningValue: boolean
  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private inf: InfActions,
    private i: InformationPipesService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      'typeCtrl': new FormControl()
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

    if (this.loadOnInit) {
      this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
        if (this.isOutgoing) this.p.inf.statement.findByParams(true, pkProject, null, null, this.pkEntity, this.pkProperty)
        else this.p.inf.statement.findByParams(true, pkProject, null, this.pkEntity, null, this.pkProperty)
      })
    }

    this.hasTypeStatement$ = this.i.pipeTypeOfEntity(this.pkEntity, this.pkProperty, this.isOutgoing)

    this.pkType$ = this.hasTypeStatement$.pipe(
      map(e => e ? (this.isOutgoing ? e.fk_object_info : e.fk_subject_info) : undefined)
    )
    this.typeLabel$ = this.pkType$.pipe(
      switchMap(pkType => this.ap.streamEntityPreview(pkType).pipe(
        map(preview => preview.entity_label)
      ))
    )
    this.pkType$.pipe(takeUntil(this.destroy$)).subscribe(pkType => {
      this.assigningValue = true
      this.formGroup.get('typeCtrl').setValue(pkType, { emitEvent: false, onlySelf: true })
      this.assigningValue = false
    })
  }

  onSubmit() {
    combineLatest(this.hasTypeStatement$, this.ap.pkProject$).pipe(
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
          const oldStatement = new InfStatement({
            pk_entity: statement.pk_entity,
            fk_subject_info: statement.fk_subject_info,
            fk_object_info: statement.fk_object_info,
            fk_property: statement.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            } as ProInfoProjRel]
          })
          const call$ = this.inf.statement.remove([oldStatement], fk_project).resolved$
          calls$.push(call$);
        }

        if (targetEntity) {
          // create and persist new statement
          const subject = this.isOutgoing ? this.pkEntity : targetEntity;
          const object = this.isOutgoing ? targetEntity : this.pkEntity;

          const newEa = new InfStatement({
            fk_subject_info: subject,
            fk_object_info: object,
            fk_property: this.pkProperty,
            entity_version_project_rels: [{ is_in_project: true } as ProInfoProjRel]
          })
          const call$ = this.inf.statement.upsert([newEa], fk_project).resolved$
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
