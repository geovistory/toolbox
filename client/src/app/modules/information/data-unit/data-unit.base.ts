import { NgRedux, ObservableStore, select } from '@angular-redux/store';
import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassConfig, ComConfig, DfhClass, DfhProperty, IAppState, InfPersistentItem, InfRole, UiContext, UiElement, ProjectCrm } from 'app/core';
import { AddOption, FieldList,  ClassInstanceLabel, PeItDetail, PropertyField, SelectPropStateType, SubstoreComponent, TeEntDetail } from 'app/core/state/models';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { createPropertyField, propertyFieldKey, StateSettings } from 'app/core/state/services/state-creator';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject, combineLatest } from 'rxjs';
import { DataUnitAPIEpics } from './data-unit.epics';
import { PeItActions } from './pe-it/pe-it.actions';
import { TeEntActions } from './te-ent/te-ent.actions';
import { takeUntil, filter, first } from 'rxjs/operators';


// maps pk_class_field to key in ngRedux store
export const propSetMap = {
  [ComConfig.PK_CLASS_FIELD_WHEN]: '_field_48'
}


export abstract class DataUnitBase implements OnInit, OnDestroy, SubstoreComponent {
  // subs: Subscription[] = []
  destroy$: Subject<boolean> = new Subject<boolean>();

  formGroup: FormGroup;

  @Input() parentPath: string[];
  basePath?: string[];


  abstract localStore: ObservableStore<TeEntDetail | PeItDetail>;
  protected actions: PeItActions | TeEntActions;

  @select() selectPropState$: Observable<SelectPropStateType>;
  @select() fkClass$: Observable<number>;
  @select() dfhClass$: Observable<DfhClass>;
  @select() isViewMode$: Observable<boolean>;
  @select() label$: Observable<string>;
  @select() pkEntity$: Observable<number>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() ingoingPropertyFields$?: PropertyField[];
  @select() outgoingPropertyFields$?: PropertyField[];
  @select() parentPeIt$: Observable<InfPersistentItem>;
  @select() propertyToAdd$: Observable<PropertyField>; // Poperty that is currently chosen in order to add a role of this kind
  @select() _fields$: Observable<FieldList>;
  @select() _type$: Observable<TypeDetail>
  @select() pkUiContext$: Observable<number>

  @select() showAddAPropertyButton$: Observable<boolean>;
  @select() showRemoveVerification$: Observable<boolean>;

  crm$: Observable<ProjectCrm>;

  comConfig = ComConfig;
  classConfig: ClassConfig;

  /**
   * class properties filled by observables
   */
  propertyFields: {}

  /**
   * Properties
   */
  label:  ClassInstanceLabel;
  labelInEdit: string;

  selectedAddOption: AddOption;

  abstract uiContext: UiContext;

  uiElementsForAddInfo: UiElement[];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder,
    protected rootEpics: RootEpics,
    protected dataUnitEpics: DataUnitAPIEpics
  ) {
    this.formGroup = this.fb.group({})
    this.crm$ = ngRedux.select(['activeProject', 'crm'])
  }

  abstract initStore(): void; // override this in derived class
  destroy(): void { }; // todo make this abstract and implement in all deferred calsses
  abstract init(): void; // hook for child class

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.destroy()

  }


  ngOnInit() {
    // Init dataUnitEpics
    this.rootEpics.addEpic(this.dataUnitEpics.createEpics(this));

    // Initialize the store by one of the derived classes
    this.initStore()

    // Initializes subscriptions
    this.initSubscriptions()

    // Initialize the rest in the derived class
    this.init()

  }


  initSubscriptions() {
    this._fields$.takeUntil(this.destroy$).subscribe(rs => {
      this.propertyFields = rs;
    })

    // this.fkClass$.takeUntil(this.destroy$).subscribe(fkClass => {
    //   if (fkClass) {
    //     // this.classConfig = this.ngRedux.getState().activeProject.crm.classes[fkClass];
    //     // this.uiElementsForAddInfo = this.classConfig.uiContexts[this.comConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE].uiElements;
    //   }
    // })

    // keep uiElementsForAddInfo up to date, of the things to add (add a property)
    combineLatest(this.fkClass$, this.pkUiContext$, this.crm$).pipe(
      first((d) => {
        const b = (d.filter(item => (item === undefined || item === null )).length === 0)
        return b;
      }),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      const fkClass = d[0], pkUiContext = d[1], crm = d[2];
      this.classConfig = crm.classes[fkClass];
      const uiContexts = this.classConfig.uiContexts[pkUiContext];
      this.uiElementsForAddInfo = !uiContexts ? [] : uiContexts.uiElements;
    })

  }





  /** ************
   * User Interactions
   ****************/


  startSelectProperty() {
    this.localStore.dispatch(this.actions.startSelectProperty())
  }

  stopSelectProperty() {
    this.localStore.dispatch(this.actions.stopSelectProperty())
  }


  /**
  * called, when user selected a the kind of property to add
  */
  addPropertyField(propertyToAdd: PropertyField, roles: InfRole[], settings?: StateSettings) {

    // inits settings, adding default values, if not provided differently
    settings = new StateSettings(settings);

    const crm = this.ngRedux.getState().activeProject.crm;
    const newPropertyField = createPropertyField(new PropertyField(propertyToAdd), roles, crm, settings);


    // add a form conrtol
    this.formGroup.addControl(
      propertyFieldKey(newPropertyField), new FormControl(
        newPropertyField.roles,
        [
          Validators.required
        ]
      )
    )

    this.localStore.dispatch(this.actions.addPropertyField(newPropertyField, this.uiContext))

  }

  /**
   * DEPRECATED: use addOptionAdded instead
  * Method to find out if a property section is already added
  */
  propertyFieldAdded(propertyFieldKey: string): boolean {
    if (this.propertyFields && this.propertyFields[propertyFieldKey]) return true;
    else return false
  }

  // /**
  // * Method to find out if a addOption is already added
  // */
  // addOptionAdded(o: AddOption): boolean {

  //   if (this.propertyFields && this.propertyFields[o.uiElement.propertyFieldKey]) return true;
  //   if (this.propertyFields && ) return true;
  //   else return false
  // }




  /**
  * Called when the user closes an empty propertyField
  */
  removePropertyField(key: string) {

    /** remove the propertyField from state */
    this.localStore.dispatch(this.actions.removePropertyField(key));

    /** remove the formControl from form */
    this.formGroup.removeControl(key)
  }

  /**
  * Called when the user closes an empty propertyField
  *
  * @param keyInState: the key in the state
  * @param val: the state object to add to the state
  */
  addPropSet(keyInState: string, val: any) {

    /** remove the propertyField from state */
    this.localStore.dispatch(this.actions.addPropSet(keyInState, val, this.uiContext));

    // add a form conrtol
    this.formGroup.addControl(
      keyInState, new FormControl(
        null,
        [
          Validators.required
        ]
      )
    )
  }


  /**
  * Called when the user closes an empty propertyField
  */
  removePropSet(keyInState: string) {

    /** remove the propertyField from state */
    this.localStore.dispatch(this.actions.removePropSet(keyInState));

    /** remove the formControl from form */
    this.formGroup.removeControl(keyInState)
  }


  toggleRemoveVerification = () => this.localStore.dispatch(this.actions.toggleRemoveVerification())

}
