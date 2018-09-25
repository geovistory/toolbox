import { Component, OnDestroy, Input, OnInit, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, InfRole, InfRoleInterface, InfLanguage, InfAppellation } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { AppeLangCreateCtrl } from './api/appe-lang-create-ctrl.models';
import { AppeLangCreateCtrlAPIEpics } from './api/appe-lang-create-ctrl.epics';
import { AppeLangCreateCtrlAPIActions } from './api/appe-lang-create-ctrl.actions';
import { appeLangCreateCtrlReducer } from './api/appe-lang-create-ctrl.reducer';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DfhConfig } from '../../shared/dfh-config';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: appeLangCreateCtrlReducer
})
@Component({
  selector: 'gv-appe-lang-create-ctrl',
  templateUrl: './appe-lang-create-ctrl.component.html',
  styleUrls: ['./appe-lang-create-ctrl.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppeLangCreateCtrlComponent),
      multi: true
    }
  ],
})
export class AppeLangCreateCtrlComponent extends AppeLangCreateCtrlAPIActions implements OnInit, OnDestroy, SubstoreComponent, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<AppeLangCreateCtrl>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  appeCtrl = new FormControl(null, [Validators.required])
  langCtrl = new FormControl(null, [Validators.required])

  // Form
  formGroup: FormGroup;

  // Emits when form is touched
  @Output() touched = new EventEmitter<void>();

  roles: InfRole[];

  constructor(
    protected rootEpics: RootEpics,
    private epics: AppeLangCreateCtrlAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    fb: FormBuilder
  ) {
    super()

    this.formGroup = fb.group({
      'appeCtrl': this.appeCtrl,
      'langCtrl': this.langCtrl
    })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, appeLangCreateCtrlReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  subscribeToFormChanges() {
    this.formGroup.valueChanges.subscribe(vals => {
      if (this.formGroup.valid && vals.appeCtrl && vals.langCtrl) {

        const a = new InfRole({
          fk_property: DfhConfig.PROPERTY_PK_R64_USED_NAME,
          fk_entity: undefined,
          fk_temporal_entity: undefined,
          appellation: {
            ...vals.appeCtrl.appellation,
            fk_class: DfhConfig.CLASS_PK_APPELLATION
          }
        });

        const l = new InfRole({
          fk_property: DfhConfig.PROPERTY_PK_R61_USED_LANGUAGE,
          fk_entity: undefined,
          fk_temporal_entity: undefined,
          language: vals.langCtrl.language
        })

        this.roles = [l, a]

      } else {
        this.roles = null;
      }
      this.onChange(this.roles)
    });
  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   *
   * Method will assign the roles to the model of the child te-ent-role-create-ctrls for
   *
   * @param roles the array of roles should consist of a role
   *  - 1112 'histP10 used in language' -> E56 Language
   *  - 1113  'histP11 refersToName' -> E41 Appellation
   */
  writeValue(roles: InfRole[]): void {
    if (roles) {
      this.langCtrl.setValue(roles.find(role => role.fk_property === DfhConfig.PROPERTY_PK_R61_USED_LANGUAGE));
      this.appeCtrl.setValue(roles.find(role => role.fk_property === DfhConfig.PROPERTY_PK_R64_USED_NAME));
    }
  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeToFormChanges();

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (roles: InfRole[] | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

}
