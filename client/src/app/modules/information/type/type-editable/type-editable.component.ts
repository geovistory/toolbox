import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IAppState, SubstoreComponent, InfEntityAssociation, InfEntityProjectRel } from 'app/core';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TypeEditableAPIActions } from './api/type-editable.actions';
import { TypeEditableAPIEpics } from './api/type-editable.epics';
import { typeReducer } from './api/type-editable.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeReducer
})
@Component({
  selector: 'gv-type',
  templateUrl: './type-editable.component.html',
  styleUrls: ['./type-editable.component.css']
})
export class TypeEditableComponent extends TypeEditableAPIActions implements OnInit, AfterViewInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() label$: Observable<string>;
  @select() editing$: Observable<boolean>;
  @select() entityAssociation$: Observable<InfEntityAssociation>;
  @select() fkDomainEntity$: Observable<number>;

  formGroup: FormGroup;
  eaCtrl: FormControl;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeEditableAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    fb: FormBuilder
  ) {
    super()
    this.eaCtrl = new FormControl(null, [Validators.required]);
    this.formGroup = fb.group({ eaCtrl: this.eaCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.entityAssociation$.pipe(takeUntil(this.destroy$)).subscribe(ea => {
      this.eaCtrl.setValue(ea);
    })


  }

  ngAfterViewInit() {
    this.formGroup.valueChanges.subscribe((value) => {
      if (this.formGroup.valid && this.localStore.getState().editing) {
        const assoc: InfEntityAssociation = value.eaCtrl;
        const fk_project = this.ngRedux.getState().activeProject.pk_project;
        const ea = this.localStore.getState().entityAssociation;
        const eas = [];
        if (ea) {
          const oldEa = new InfEntityAssociation({
            fk_domain_entity: ea.fk_domain_entity,
            fk_range_entity: ea.fk_range_entity,
            fk_property: ea.fk_property,
            entity_version_project_rels: [{
              fk_project,
              is_in_project: false
            } as InfEntityProjectRel]
          })
          eas.push(oldEa);
        }
        const newEa = new InfEntityAssociation({
          fk_domain_entity: this.localStore.getState().fkDomainEntity,
          fk_range_entity: assoc.fk_range_entity,
          fk_property: assoc.fk_property,
          entity_version_project_rels: [{ is_in_project: true } as InfEntityProjectRel]
        })
        eas.push(newEa);
        this.changeType(fk_project, eas);
      }
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
