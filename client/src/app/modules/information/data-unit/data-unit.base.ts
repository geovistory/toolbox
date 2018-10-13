import { NgRedux, ObservableStore, select } from '@angular-redux/store';
import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassConfig, ComConfig, DfhClass, DfhProperty, IAppState, InfPersistentItem, U, UiContext, UiElement, InfRole } from 'app/core';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { AddOption, DataUnitLabel, ExistenceTimeDetail, PeItDetail, RoleSet, RoleSetI, RoleSetList, SelectPropStateType, TeEntDetail, RoleSetForm, DataUnitChildList, SubstoreComponent } from 'app/core/state/models';
import { StateCreatorService } from '../shared/state-creator.service';
import { PeItActions } from './pe-it/pe-it.actions';
import { TeEntActions } from './te-ent/te-ent.actions';
import { roleSetKey, createRoleSet, StateSettings } from 'app/core/state/services/state-creator';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { RootEpics } from 'app/core/store/epics';
import { DataUnitAPIEpics } from './data-unit.epics';


// maps pk_property_set to key in ngRedux store
export const propSetMap = {
  [ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME]: '_existenceTime'
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
  @select() label$: Observable<string>;
  @select() pkEntity$: Observable<number>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() ingoingRoleSets$?: RoleSet[];
  @select() outgoingRoleSets$?: RoleSet[];
  @select() parentPeIt$: Observable<InfPersistentItem>;
  @select() propertyToAdd$: Observable<RoleSet>; // Poperty that is currently chosen in order to add a role of this kind
  @select() _children$: Observable<DataUnitChildList>;
  @select() _type$: Observable<TypeDetail>

  @select() showRightPanel$: Observable<boolean>;
  @select() showAddAPropertyButton$: Observable<boolean>;

  comConfig = ComConfig;
  classConfig: ClassConfig;

  /**
   * class properties filled by observables
   */
  roleSets: {}

  /**
   * Properties
   */
  label: DataUnitLabel;
  labelInEdit: string;

  selectedAddOption: AddOption;

  abstract uiContext: UiContext;

  uiElementsForAddInfo: UiElement[];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService,
    protected rootEpics: RootEpics,
    protected dataUnitEpics: DataUnitAPIEpics
  ) {
    this.formGroup = this.fb.group({})
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
    this._children$.takeUntil(this.destroy$).subscribe(rs => {
      this.roleSets = rs;
    })

    this.fkClass$.takeUntil(this.destroy$).subscribe(fkClass => {
      if (fkClass) {
        this.classConfig = this.ngRedux.getState().activeProject.crm.classes[fkClass];
        this.uiElementsForAddInfo = this.classConfig.uiContexts[this.comConfig.PK_UI_CONTEXT_EDITABLE].uiElements;
      }
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
  addRoleSet(propertyToAdd: RoleSet, roles: InfRole[], settings: StateSettings = {}) {


    const crm = this.ngRedux.getState().activeProject.crm;
    const newRoleSet = createRoleSet(new RoleSet(propertyToAdd), roles, crm, settings);


    // add a form conrtol
    this.formGroup.addControl(
      roleSetKey(newRoleSet), new FormControl(
        newRoleSet.roles,
        [
          Validators.required
        ]
      )
    )

    this.localStore.dispatch(this.actions.addRoleSet(newRoleSet, this.uiContext))

  }

  /**
   * DEPRECATED: use addOptionAdded instead
  * Method to find out if a property section is already added
  */
  roleSetAdded(roleSetKey: string): boolean {
    if (this.roleSets && this.roleSets[roleSetKey]) return true;
    else return false
  }

  // /**
  // * Method to find out if a addOption is already added
  // */
  // addOptionAdded(o: AddOption): boolean {

  //   if (this.roleSets && this.roleSets[o.uiElement.roleSetKey]) return true;
  //   if (this.roleSets && ) return true;
  //   else return false
  // }




  /**
  * Called when the user closes an empty roleSet
  */
  removeRoleSet(key: string) {

    /** remove the roleSet from state */
    this.localStore.dispatch(this.actions.removeRoleSet(key));

    /** remove the formControl from form */
    this.formGroup.removeControl(key)
  }

  /**
  * Called when the user closes an empty roleSet
  *
  * @param keyInState: the key in the state
  * @param val: the state object to add to the state
  */
  addPropSet(keyInState: string, val: any) {

    /** remove the roleSet from state */
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
  * Called when the user closes an empty roleSet
  */
  removePropSet(keyInState: string) {

    /** remove the roleSet from state */
    this.localStore.dispatch(this.actions.removePropSet(keyInState));

    /** remove the formControl from form */
    this.formGroup.removeControl(keyInState)
  }

}
