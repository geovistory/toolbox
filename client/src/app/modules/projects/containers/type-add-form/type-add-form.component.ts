import { Component, OnDestroy, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, InfRole, InfLanguage, ComConfig, InfPersistentItem, InfTemporalEntity } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TypeAddForm } from './api/type-add-form.models';
import { TypeAddFormAPIEpics } from './api/type-add-form.epics';
import { TypeAddFormAPIActions } from './api/type-add-form.actions';
import { typeAddFormReducer } from './api/type-add-form.reducer';
import { DfhConfig } from '../../../information/shared/dfh-config';
import { InfTextProperty } from '../../../../core/sdk/models/InfTextProperty';
import { NgForm } from '@angular/forms';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeAddFormReducer
})
@Component({
  selector: 'gv-type-add-form',
  templateUrl: './type-add-form.component.html',
  styleUrls: ['./type-add-form.component.css']
})
export class TypeAddFormComponent extends TypeAddFormAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeAddForm>;

  // path to the substore
  @Input() basePath = ['activeProject', 'classSettings', 'types', 'add'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  // Emitted when user clicks cancel
  @Output() cancel = new EventEmitter<void>();

  @Output() create = new EventEmitter<InfPersistentItem>();

  @ViewChild('f') ngForm: NgForm;

  // Model of the form
  model: {
    appeLang?: InfRole[],
    textProperty?: InfTextProperty
  } = {};



  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeAddFormAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
    ngRedux.select<InfLanguage>(['activeProject', 'default_language', 'inf_language']).takeUntil(this.destroy$)
      .subscribe(l => {

        // assign the projects default language
        this.model.appeLang = [new InfRole({
          fk_entity: undefined,
          fk_property: DfhConfig.PROPERTY_PK_R61_USED_LANGUAGE,
          fk_temporal_entity: undefined,
          language: new InfLanguage(l)
        })]
        this.model.textProperty = new InfTextProperty({
          fk_concerned_entity: undefined,
          text_property_quill_doc: undefined,
          fk_system_type: ComConfig.PK_SYSTEM_TYPE__TEXT_PROPERY__DEFINITION,
          fk_language: 19703,
          language: new InfLanguage(l),
        })

      })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeAddFormReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    // prepare InfPersistentItem
    console.log(this.ngForm.value)

    const fk_class = this.ngRedux.getState().activeProject.classSettings.types.class.dfh_pk_class;

    const peIt = new InfPersistentItem({
      fk_class,
      pi_roles: [
        new InfRole({
          fk_entity: undefined,
          fk_temporal_entity: undefined,
          fk_property: DfhConfig.PROPERTY_PK_R64_USED_NAME,
          temporal_entity: new InfTemporalEntity({
            fk_class: DfhConfig.CLASS_PK_APPELLATION_USE,
            te_roles: this.model.appeLang
          })
        })
      ],
      text_properties: [this.model.textProperty]
    })

    this.create.emit(peIt);

  }

}
