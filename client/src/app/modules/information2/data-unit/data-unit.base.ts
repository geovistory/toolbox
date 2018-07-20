import { NgRedux, ObservableStore, select } from '@angular-redux/store';
import { Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassConfig, ComConfig, DfhClass, DfhProperty, IAppState, InfPersistentItem, UiContext } from 'app/core';
import { Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { NgbTypeahead } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { roleSetKey, roleSetKeyFromParams } from '../information.helpers';
import { AddOption, PeItDetail, RoleSet, RoleSetList, SelectPropStateType, TeEntDetail, ExistenceTimeDetail, DataUnitLabel, RoleSetInterface } from '../information.models';
import { PeItActions } from './pe-it/pe-it.actions';
import { TeEntActions } from './te-ent/te-ent.actions';
import { StateCreatorService } from '../shared/state-creator.service';

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

  comConfig = ComConfig;
  classConfig: ClassConfig;

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
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
  label: DataUnitLabel;
  labelInEdit: string;

  selectedAddOption: AddOption;

  abstract uiContext: UiContext;

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    // Initialize the store by one of the derived classes
    this.initStore()

    // Initialize the children in this class
    // this.initChildren() SINGLE_INIT

    // Initializes subscriptions
    this.initSubscriptions()

    // Initialize the rest in the derived class
    this.init()

  }


  initSubscriptions() {
    this.subs.push(this._children$.subscribe(rs => {
      this.roleSets = rs;
    }))

    this.subs.push(this.fkClass$.subscribe(fkClass => {
      if (fkClass)
        this.classConfig = this.ngRedux.getState().activeProject.crm.classes[fkClass];
    }))
  }


  get addOptions(): AddOption[] {
    return this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE].uiElements.map(el => {
      if (
        this.roleSets && el.fk_property && !this.roleSets[el.roleSetKey]
      ) {
        const roleSet = this.classConfig.roleSets[roleSetKeyFromParams(el.fk_property, el.property_is_outgoing)]
        return {
          label: roleSet.label.default,
          uiElement: el
        }
      }
      else if (this.roleSets && el.fk_property_set && !this.roleSets[propSetMap[el.fk_property_set]]) {
        return {
          label: el.property_set.label,
          uiElement: el
        }
      }
    }).filter(o => (o))
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
  addRoleSet(propertyToAdd: RoleSetInterface) {

    // add a role set
    const newRoleSet = new RoleSet({
      ...propertyToAdd,
      toggle: 'expanded',
      roles: [],
      rolesNotInProjectLoading: true,
      roleStatesInOtherProjectsVisible: false,
      _role_set_form: {}
    })

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



  /**
   * Typeahead. 
   * TODO: extract to component 
   */

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  typeaheadWitdh: number;

  search = (text$: Observable<string>) => {

    this.selectedAddOption = undefined;

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    // filter options not yet added
    const options = this.addOptions;

    return Observable.merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).map((term) =>
      (term === '' ? options : options
        .filter(o => (
          o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
        ))
      ).slice(0, 10)
    )
  }



  addOptionSelected($event) {
    const o: AddOption = $event.item;

    if (o.uiElement.roleSetKey) {
      this.addRoleSet(this.classConfig.roleSets[o.uiElement.roleSetKey])
    }

    else if (o.uiElement.fk_property_set) {

      if (o.uiElement.fk_property_set === ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

        this.stateCreator.initializeExistenceTimeState([], new ExistenceTimeDetail({ toggle: 'expanded' }), { isCreateMode: true }).subscribe(val => {
          this.addPropSet('_existenceTime', val)
        })

      }

    }

  }

}
