import { Component, OnInit, Input } from '@angular/core';
import { InformationBasicPipesService } from '../../services/information-basic-pipes.service';
import { Observable, Subject, combineLatest } from '../../../../../../node_modules/rxjs';
import { InformationPipesService } from '../../services/information-pipes.service';
import { FormGroup, FormBuilder, FormControl } from '../../../../../../node_modules/@angular/forms';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { switchMap, map, takeUntil, first, filter } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfStatement, ProInfoProjRel } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';

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

  isViewMode: boolean;

  hasTypeRole$: Observable<InfStatement>
  pkType$: Observable<number>
  typeLabel$: Observable<string>

  formGroup: FormGroup;
  editing: boolean;
  loading: boolean;
  assigningValue: boolean
  constructor(
    private p: ActiveProjectService,
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

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.inf.statement.findByParams(true, pkProject, null, null, this.pkEntity, this.pkProperty)
    })

    this.hasTypeRole$ = this.i.pipeTypeOfEntity(this.pkEntity, this.pkProperty)

    this.pkType$ = this.hasTypeRole$.pipe(
      map(e => e ? e.fk_object_info : undefined)
    )
    this.typeLabel$ = this.pkType$.pipe(
      switchMap(pkType => this.p.streamEntityPreview(pkType).pipe(
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
    combineLatest(this.hasTypeRole$, this.p.pkProject$).pipe(
      first(),
      takeUntil(this.destroy$)
    ).subscribe(([statement, fk_project]) => {
      const value = this.formGroup.get('typeCtrl').value;
      if (
        (statement && statement.fk_object_info == value) ||
        (!statement && !value)
      ) {
        this.editing = false
      }
      else {
        this.loading = true

        // old ea
        const calls$ = [];
        if (statement) {
          const oldEa = new InfStatement({
            pk_entity: statement.pk_entity,
            fk_subject_info: statement.fk_subject_info,
            fk_object_info: statement.fk_object_info,
            fk_property: statement.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            } as ProInfoProjRel]
          })
          const call$ = this.inf.statement.remove([oldEa], fk_project).resolved$
          calls$.push(call$);
        }

        // new ea
        if (value) {
          const newEa = new InfStatement({
            fk_subject_info: this.pkEntity,
            fk_object_info: value,
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
