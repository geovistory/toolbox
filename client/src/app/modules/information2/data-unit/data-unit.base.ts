import { ObservableStore, select, NgRedux } from '@angular-redux/store';
import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DfhClass, DfhProperty, InfPersistentItem, Project, IAppState, ClassConfig, ComConfig } from 'app/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { roleSetKey } from '../information.helpers';
import { PeItDetail, RoleSet, RoleSetList, SelectPropStateType, TeEntDetail, AddOption } from '../information.models';
import { PeItActions } from './pe-it/pe-it.actions';
import { TeEntActions } from './te-ent/te-ent.actions';

// maps pk_property_set to key in ngRedux store
export const propSetMap = {
  [ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME]: '_existenceTime'
}


export abstract class DataUnitBase implements OnInit, OnDestroy {
  subs: Subscription[] = []

  formGroup: FormGroup;

  @Input() parentPath: string[];


  abstract initStore(): void; // override this in derived class

  abstract localStore: ObservableStore<TeEntDetail | PeItDetail>;
  protected actions: PeItActions | TeEntActions;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  @select() selectPropState$: Observable<SelectPropStateType>;
  @select() fkClass$: Observable<number>;
  @select() dfhClass$: Observable<DfhClass>;
  @select() label$: Observable<string>;
  @select() pkEntity$: Observable<number>
  // @select() roles$: Observable<InfRole[]>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() ingoingRoleSets$?: RoleSet[];
  @select() outgoingRoleSets$?: RoleSet[];
  @select() parentPeIt$: Observable<InfPersistentItem>;
  @select() propertyToAdd$: Observable<RoleSet>; // Poperty that is currently chosen in order to add a role of this kind
  @select() _children$: Observable<RoleSetList>;

  classConfig: ClassConfig;

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({})
  }

  /**
   * class properties filled by observables 
   */
  roleSets: {}

  /**
   * Properties
   */
  label: string;
  labelInEdit: string;

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    // Initialize the store by one of the derived classes
    this.initStore()

    this.classConfig = this.ngRedux.getState().activeProject.crm[this.localStore.getState().fkClass];

    // Initialize the children in this class
    // this.initChildren() SINGLE_INIT

    // Initializes subscriptions
    this.initSubscriptions()

    // Initialize the rest in the derived class
    this.init()

  }


  initSubscriptions() {
    this.subs.push(this._children$.subscribe(rs =>
      this.roleSets = rs
    ))
  }


  abstract init(): void; // hook for child class


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
  addRoleSet(propertyToAdd: RoleSet) {

    // add a role set
    const newRoleSet: RoleSet = {
      ...propertyToAdd,
      toggle: 'expanded',
      roles: [],
      rolesNotInProjectLoading: true,
      roleStatesInOtherProjectsVisible: false,
      _role_set_form: {}
    }

    // add a form conrtol
    this.formGroup.addControl(
      roleSetKey(newRoleSet), new FormControl(
        newRoleSet.roles,
        [
          Validators.required
        ]
      )
    )

    this.localStore.dispatch(this.actions.addRoleSet(newRoleSet))

  }

  /**
   * DEPRECATED: use addOptionAdded instead
  * Method to find out if a property section is already added
  */
  roleSetAdded(roleSetKey: string): boolean {
    if (this.roleSets && this.roleSets[roleSetKey]) return true;
    else return false
  }

  /**
  * Method to find out if a addOption is already added
  */
  addOptionAdded(o: AddOption): boolean {

    if (this.roleSets && this.roleSets[o.uiElement.roleSetKey]) return true;
    if (this.localStore.getState()[propSetMap[o.uiElement.fk_property_set]]) return true;
    else return false
  }




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
    this.localStore.dispatch(this.actions.addPropSet(keyInState, val));

    // /** remove the formControl from form */
    // this.formGroup.removeControl(propSetMap[key])
  }


  /**
  * Called when the user closes an empty roleSet
  */
  removePropSet(key: number) {

    /** remove the roleSet from state */
    this.localStore.dispatch(this.actions.removePropSet(propSetMap[key]));

    // /** remove the formControl from form */
    // this.formGroup.removeControl(propSetMap[key])
  }


}
