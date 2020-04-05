import { Component, OnInit, Input } from '@angular/core';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { Observable, Subject, combineLatest } from '../../../../../../node_modules/rxjs';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { FormGroup, FormBuilder, FormControl } from '../../../../../../node_modules/@angular/forms';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { switchMap, map, takeUntil, first, filter } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfRole, ProInfoProjRel } from '../../../../core';
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

  hasTypeRole$: Observable<InfRole>
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

    this.hasTypeRole$ = this.i.pipeTypeOfEntity(this.pkEntity, this.pkProperty)

    this.pkType$ = this.hasTypeRole$.pipe(
      map(e => e ? e.fk_entity : undefined)
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
    ).subscribe(([role, fk_project]) => {
      const value = this.formGroup.get('typeCtrl').value;
      if (
        (role && role.fk_entity == value) ||
        (!role && !value)
      ) {
        this.editing = false
      }
      else {
        this.loading = true

        // old ea
        const calls$ = [];
        if (role) {
          const oldEa = new InfRole({
            pk_entity: role.pk_entity,
            fk_temporal_entity: role.fk_temporal_entity,
            fk_entity: role.fk_entity,
            fk_property: role.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            } as ProInfoProjRel]
          })
          const call$ = this.inf.role.remove([oldEa], fk_project).resolved$
          calls$.push(call$);
        }

        // new ea
        if (value) {
          const newEa = new InfRole({
            fk_temporal_entity: this.pkEntity,
            fk_entity: value,
            fk_property: this.pkProperty,
            entity_version_project_rels: [{ is_in_project: true } as ProInfoProjRel]
          })
          const call$ = this.inf.role.upsert([newEa], fk_project).resolved$
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
