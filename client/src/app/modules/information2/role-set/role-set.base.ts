import {
    OnChanges, OnInit, Input, Output, ViewChildren,
    QueryList, EventEmitter, ChangeDetectorRef, OnDestroy
} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';
import { indexBy } from 'ramda'
import { InfRole, DfhProperty, InfEntityProjectRelApi, InfRoleApi, EntityEditorService, InfPersistentItem, Project, IAppState } from 'app/core';

import { ObservableStore, NgRedux, select, WithSubStore } from '@angular-redux/store';
import { RoleSetActions, roleStateKey } from './role-set.actions';
import { roleSetReducer } from './role-set.reducer';
import { isObject } from 'util';

import { ControlValueAccessor, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, ReplaySubject } from 'rxjs';
import { RoleSet, CollapsedExpanded, RoleDetailList, RoleDetail, RoleSetForm } from '../information.models';
import { RoleSetService } from '../shared/role-set.service';
import { StateCreatorService } from '../shared/state-creator.service';
import { ClassService } from '../shared/class.service';
import { RoleActions } from '../role/role.actions';
import { RoleService } from '../shared/role.service';
import { roleReducer } from '../role/role.reducers';
import { StateToDataService } from '../shared/state-to-data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

export type RoleSetLabelObj = {
    default: string
    pl: string
    sg: string
}

@AutoUnsubscribe()
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer:roleSetReducer
})
export abstract class RoleSetBase implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() parentPath: string[];

    @Input() index: string;
    getBasePath = () => this.index ?
        [...this.parentPath, '_roleSet_list', this.index] :
        null;
    basePath: string[];
    localStore: ObservableStore<RoleSet>;

    addButtonVisible: boolean = true;
    removeRoleSetBtnVisible: boolean = false;

    /**
    * Paths to other slices of the store
    */

    // Since we're observing an array of items, we need to set up a 'trackBy'
    // parameter so Angular doesn't tear down and rebuild the list's DOM every
    // time there's an update.
    getKey(_, item) {
        return item.key;
    }


    /**
     * Local store Observables
     */
    @select() roles$: Observable<InfRole[]>
    @select() property$: Observable<DfhProperty>
    @select() fkProperty$: Observable<number>
    @select() isOutgoing$: Observable<boolean>
    @select() parentPeIt$: Observable<InfPersistentItem>
    @select() parentEntityPk$: Observable<number>
    @select() toggle$: Observable<CollapsedExpanded>
    @select() label$: Observable<RoleSetLabelObj>
    @select() rolesNotInProjectLoading$: Observable<boolean>;

    @select() _role_list$: Observable<RoleDetailList>
    @select() _role_set_form$: Observable<RoleSetForm>
    
    //Roles that are added to the project
    @select() roleStatesInProjectVisible$: Observable<boolean>

    //Roles that are added to at least one other project
    @select() roleStatesInOtherProjectsVisible$: Observable<boolean>

    //Roles that are in no project (that have been removed from at least the project that created it)
    @select() roleStatesInNoProjectVisible$: Observable<boolean>

    //Roles currently being created
    @select() roleStatesToCreateVisible$: Observable<boolean>


    /**
    * Other Store Observables
    */

    roleStatesInProject: RoleDetailList
    project: Project;
    roleSetState: RoleSet;


    /**
     * Properties
     */

    formGroup: FormGroup; // formGroup to create roles
    formValPath: string[];
    createFormControlCount: number = 0;
    subs: Subscription[] = []; // for unsubscribe onDestroy

    fromValueForReset: any;

    /**
     * Outputs
     */

    @Output() onRemoveRoleSet: EventEmitter<void> = new EventEmitter();

    constructor(
        protected eprApi: InfEntityProjectRelApi,
        protected roleApi: InfRoleApi,
        protected ngRedux: NgRedux<IAppState>,
        protected actions: RoleSetActions,
        protected roleSetService: RoleSetService,
        protected roleStore: NgRedux<RoleDetail>,
        protected roleActions: RoleActions,
        protected stateCreator: StateCreatorService,
        protected classService: ClassService,
        protected fb: FormBuilder
    ) {

        this.initForm();

        this.initFormSubscription();

    }

    /**
     * Inits the formGroup used in template.
     */
    initForm() {
        //   create the formGroup used to create/edit the roleSet's InfRole[]
        this.formGroup = this.fb.group({});
    }

    /**
     * Subcscibes to form value changes
     */
    initFormSubscription() {

        this.subs.push(this.formGroup.valueChanges.subscribe(val => {
            if (this.formGroup.valid) {

                // build a array of InfRole
                let roles: InfRole[] = [];
                Object.keys(this.formGroup.controls).forEach(key => {
                    if (this.formGroup.get(key)) {
                        roles.push(this.formGroup.get(key).value)
                    }
                })

                // send the peIt the parent form
                this.onChange(roles)
            }
            else {
                this.onChange(null)
            }
        }))
    }


    /**
    * Methods
    */
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), roleSetReducer);
        this.basePath = this.getBasePath();

        /** prepare the formGroup connection path for @ng-redux/forms */
        this.formValPath = [...this.basePath, 'formGroup'];


        this.subs.push(this._role_list$.subscribe(d => { this.roleStatesInProject = d; }))

        // Subscribe to the activeProject, to get the pk_project needed for api call
        this.subs.push(this.ngRedux.select<Project>('activeProject').subscribe(d => this.project = d));

        this.subs.push(this.localStore.select<RoleSet>('').subscribe(d => {
            this.roleSetState = d
        }));

        this.subs.push(Observable.combineLatest(this.toggle$, this._role_set_form$, this._role_list$).subscribe(res => {
            const toggle = res[0], roleStatesToCreate = res[1], roleStatesInProject = res[2];

            if (this.roleSetState) {
                // count roles of this roleSet that are in the project or currently being created 
                const rolesCount = Object.keys(roleStatesToCreate || {}).length + Object.keys(roleStatesInProject || {}).length;

                // check if more roles would be possible in this role set
                const moreRolesPossible = this.roleSetService.moreRolesPossible(rolesCount, this.roleSetState);

                // assign the add button visibility
                this.addButtonVisible = (toggle === 'expanded' && moreRolesPossible);

                this.removeRoleSetBtnVisible = ((!roleStatesToCreate || roleStatesToCreate == {}) && (!roleStatesInProject || roleStatesInProject == {}));
            }
        }))


        this.init();

    }

    abstract init():void // hook for child classes


    /**
     * Initializes the form controls
    */
    initFormCtrls() {

        let formCrtlsToRemove: string[] = [];

        // add controls for each child roleSet
        if (this.roleSetState && this.roleSetState._role_list)
            Object.keys(this.roleSetState._role_list).forEach((key) => {
                if (this.roleSetState._role_list[key]) {

                    this.formGroup.addControl(key, new FormControl(
                        this.roleSetState._role_list[key].role,
                        [
                            Validators.required
                        ]
                    ))
                }
                else {
                    formCrtlsToRemove.push(key);
                }
            })

        // remove control of removed chiild state
        formCrtlsToRemove.forEach(key => {
            this.formGroup.removeControl(key);
        })

        // assign the value after initializing all form controls
        this.fromValueForReset = this.formGroup.value;

    }



    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }




    /**
    * Called when the users clicks on cancel to stop creating a new roleset
    */
    removeRoleSet() {
        this.onRemoveRoleSet.emit()
    }



    /**
    * changeStandardRole - Make another child role the standard role for
    * the active project.
    *
    * @param key  the key of the child RoleState in the store tree
    * @return {void}
    */
    changeStandardRole(input: { roleState: RoleDetail, key: string }) {

        let observables = [];


        // set loadingStdChange flag of the given child Role
        const inputRoleStore = this.getChildRoleStore(input.key)

        inputRoleStore.dispatch(this.roleActions.changeDisplayRoleLoading(true))

        // Create observable of api call to make the given role new standard

        observables.push(this.eprApi.patchAttributes(
            input.roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
            {
                is_standard_in_project: true
            }
        ))

        // Get all Display Roles to disable (should be only one)

        const rolesToChange: RoleDetail[] = [];

        Object.keys(this.roleStatesInProject).forEach(key => {
            const roleState: RoleDetail = this.roleStatesInProject[key];
            const isDisplayRole = RoleService.isDisplayRole(roleState.isOutgoing, roleState.isDisplayRoleForDomain, roleState.isDisplayRoleForRange)
            if (roleState && isDisplayRole) {

                // set loadingStdChange flag of the RoleState
                this.getChildRoleStore(key).dispatch(this.roleActions.changeDisplayRoleLoading(true))

                // push the RoleState to an array that will be used later
                rolesToChange.push(roleState);

                // Create observable of api call to disable the old standard
                observables.push(this.eprApi.patchAttributes(
                    roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
                    {
                        is_standard_in_project: false
                    }
                ))
            }
        });

        this.subs.push(Observable.combineLatest(observables)
            .subscribe(
                (value) => {

                    // update the epr of the new Std in store
                    const isDisplayRole = value[0].is_standard_in_project,
                        isOutgoing = input.roleState.isOutgoing;
                    inputRoleStore.dispatch(this.roleActions.changeDisplayRoleSucceeded(isDisplayRole, isOutgoing))

                    // update the former display role states (should be only one) in store 
                    for (let i = 0; i < rolesToChange.length; i++) {
                        const isDisplayRole = RoleService.isDisplayRole(rolesToChange[i].isOutgoing, rolesToChange[i].isDisplayRoleForDomain, rolesToChange[i].isDisplayRoleForRange)
                        this.getChildRoleStore(roleStateKey(rolesToChange[i])).dispatch(this.roleActions.changeDisplayRoleSucceeded(false, rolesToChange[i].isOutgoing))
                    }

                }))

    }


    getChildRoleStore(key): ObservableStore<RoleDetail> {
        return this.roleStore.configureSubStore([... this.basePath, 'roleStatesInProject', key], roleReducer);
    }


    /**
    * Methods specific to create state
    */


    /**
    * called when user cancels to create one specific role
    *
    */
    cancelCreateRole(key) {

        /** remove the form control from form */
        this.formGroup.removeControl(key)

        /** remove the RoleState from state */
        const roleStates = Object.assign({}, this.roleSetState._role_set_form._role_create_list);
        delete roleStates[key];
        this.localStore.dispatch(this.actions.roleCreationCancelled(roleStates));

    }

    /**
    *  called when user cancels to create new roles
    *
    */
    cancelCreateRoles() {

        /** remove all form controls from form */
        Object.keys(this.roleSetState._role_set_form._role_create_list).forEach(key => {
            this.formGroup.removeControl(key)
        })

        /** remove the RoleState from state */
        this.localStore.dispatch(this.actions.stopCreateNewRole());

    }


    /**
    * removeFromProject - called when user removes a role (nested) from project
    */
    removeFromProject(key: string) {
        const roleState = this.roleSetState._role_list[key];
        if (RoleService.isDisplayRole(roleState.isOutgoing, roleState.isDisplayRoleForDomain, roleState.isDisplayRoleForRange)) {
            alert("You can't remove the standard item. Make another item standard and try again.")
        } else {

            console.error('missing function:')

            // const roleToRemove = StateToDataService.roleStateToRoleToRelate(roleState)


            // this.subs.push(this.roleApi.changeRoleProjectRelation(
            //     this.project.pk_project, false, roleToRemove
            // ).subscribe(result => {
            //     this.localStore.dispatch(this.actions.roleRemovedFromProject(key))
            // }))
        }
    }




    /**
    * toggleCardBody - toggles the state of the card in order to collapse or
    * expand the card in the UI
    */
    toggleCardBody() {
        this.localStore.dispatch(this.actions.toggle())
    }


    /**
     * can be called, on cancelling edinting the form,
     * so that the initial value of the form is emitted by this.onChange()
     */
    resetForm() {
        this.formGroup.reset(this.fromValueForReset);
    }


    /****************************************
     *  ControlValueAccessor implementation *
     ****************************************/

    /**
     * Allows Angular to update the model.
     * Update the model and changes needed for the view here.
     */
    writeValue(roles: InfRole[]): void {


    }


    /**
     * Allows Angular to register a function to call when the model changes.
     * Save the function as a property to call later here.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;

        /**
         * initializes form contols after the role set component is registered by 
         * the parent's form, so that when initialization of the form controls 
         * triggers the subscription of the form's valueChanges, the onChange method
         * was allready registered.
         */
        this.initFormCtrls();

    }

    /**
     * gets replaced by angular on registerOnChange
     * This function helps to type the onChange function for the use in this class.
     */
    onChange = (peIt: InfRole[] | null) => {
        console.warn('Oups: onChange got called before this.registerOnChange() was called')
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

    @Output() touched: EventEmitter<void> = new EventEmitter();

}
