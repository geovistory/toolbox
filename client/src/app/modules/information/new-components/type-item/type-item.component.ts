import { Component, OnInit, Input } from '@angular/core';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { Observable, Subject, combineLatest } from '../../../../../../node_modules/rxjs';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { FormGroup, FormBuilder, FormControl } from '../../../../../../node_modules/@angular/forms';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { switchMap, map, takeUntil, first, filter } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfEntityAssociation, ProInfoProjRel } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';

@Component({
  selector: 'gv-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss']
})
export class TypeItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @Input() pkEntity: number

  pkTypedClass$: Observable<number>
  property$: Observable<number>
  hasTypeProperty$: Observable<boolean>
  entityAssociation$: Observable<InfEntityAssociation>
  pkType$: Observable<number>
  typeLabel$: Observable<string>

  formGroup: FormGroup;
  editing: boolean;
  loading: boolean;
  assigningValue: boolean
  constructor(
    private p: ActiveProjectService,
    private inf: InfActions,
    private b: InformationBasicPipesService,
    private c: ConfigurationPipesService,
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
    if (!this.pkEntity) throw 'You must provide a pkEntity'
    this.pkTypedClass$ = this.b.pipeClassOfEntity(this.pkEntity)
    this.property$ = this.pkTypedClass$.pipe(
      switchMap(pkTypedClass => this.c.pipeTypePropertyOfTypedClass(pkTypedClass))
    )
    this.hasTypeProperty$ = this.property$.pipe(map(prop => prop ? true : false))
    this.entityAssociation$ = this.i.pipeTypeEntityAssociation(this.pkEntity)
    this.pkType$ = this.entityAssociation$.pipe(
      map(e => e ? e.fk_info_range : undefined)
    )
    this.typeLabel$ = this.pkType$.pipe(
      switchMap(pkType => this.i.pipeLabelOfEntity(pkType))
    )
    this.pkType$.pipe(takeUntil(this.destroy$)).subscribe(pkType => {
      this.assigningValue = true
      this.formGroup.get('typeCtrl').setValue(pkType, { emitEvent: false, onlySelf: true })
      this.assigningValue = false

    })
  }

  onSubmit() {
    combineLatest(this.entityAssociation$, this.property$, this.p.pkProject$).pipe(
      first(),
      takeUntil(this.destroy$)
    ).subscribe(([entityAssociation, fk_property, fk_project]) => {
      const value = this.formGroup.get('typeCtrl').value;
      if (
        (entityAssociation && entityAssociation.fk_info_range == value) ||
        (!entityAssociation && !value)
      ) {
        this.editing = false
      }
      else {
        this.loading = true

        // old ea
        const calls$ = [];
        if (entityAssociation) {
          const oldEa = new InfEntityAssociation({
            pk_entity: entityAssociation.pk_entity,
            fk_info_domain: entityAssociation.fk_info_domain,
            fk_info_range: entityAssociation.fk_info_range,
            fk_property: entityAssociation.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            } as ProInfoProjRel]
          })
          const call$ = this.inf.entity_association.remove([oldEa], fk_project).resolved$
          calls$.push(call$);
        }

        // new ea
        if (value) {
          const newEa = new InfEntityAssociation({
            fk_info_domain: this.pkEntity,
            fk_info_range: value,
            fk_property,
            entity_version_project_rels: [{ is_in_project: true } as ProInfoProjRel]
          })
          const call$ = this.inf.entity_association.upsert([newEa], fk_project).resolved$
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
