

import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DfhProperty, IAppState, InfEntityProjectRel, InfEntityProjectRelApi, InfPersistentItem, InfRole, InfRoleApi, Project, U } from 'app/core';
import { CollapsedExpanded, FieldLabel, PropertyField, PropertyFieldForm, RoleDetail, RoleDetailList } from 'app/core/state/models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { RootEpics } from '../../../core/store/epics';
import { RoleActions } from '../role/role.actions';
import { roleReducer } from '../role/role.reducers';
import { ClassService } from '../shared/class.service';
import { PropertyFieldService } from '../shared/property-field.service';
import { StateToDataService } from '../shared/state-to-data.service';
import { PropertyFieldActions } from './property-field.actions';
import { PropertyFieldApiEpics } from './property-field.epics';
import { propertyFieldReducer } from './property-field.reducer';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@AutoUnsubscribe({
    blackList: ['destroy$']
})
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: propertyFieldReducer
})
export abstract class PropertyFieldBase implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() parentPath: string[];

    @Input() index: string;

    basePath: string[];
    localStore: ObservableStore<PropertyField>;

    destroy$: Subject<boolean> = new Subject<boolean>();

    addButtonVisible = true;
    removePropertyFieldBtnVisible = false;


    /**
     * Local store Observables
     */
    @select() roles$: Observable<InfRole[]>
    @select() property$: Observable<DfhProperty>
    @select() fkProperty$: Observable<number>
    @select() isOutgoing$: Observable<boolean>
    @select() parentPeIt$: Observable<InfPersistentItem>
    @select() parentEntityPk$: Observable<number>
    @select() targetMaxQuantity$: Observable<number>
    @select() hasAlternatives$: Observable<boolean>

    @select() isViewMode$: Observable<boolean>
    @select() toggle$: Observable<CollapsedExpanded>
    @select() label$: Observable<FieldLabel>
    @select() dragEnabled$: Observable<boolean>

    @select() rolesNotInProjectLoading$: Observable<boolean>;

    @select() _role_list$: Observable<RoleDetailList>
    @select() _property_field_form$: Observable<PropertyFieldForm>

    // Roles that are added to the project
    @select() _role_listVisible$: Observable<boolean>

    // Roles that are added to at least one other project
    @select() roleStatesInOtherProjectsVisible$: Observable<boolean>

    // Roles that are in no project (that have been removed from at least the project that created it)
    @select() roleStatesInNoProjectVisible$: Observable<boolean>

    // Roles currently being created
    @select() roleStatesToCreateVisible$: Observable<boolean>


    /**
    * Other Store Observables
    */

    _role_list: RoleDetailList
    project: Project;
    propertyFieldState: PropertyField;

    roleDetails: { key: string, value: RoleDetail }[];


    /**
     * Properties
     */

    formGroup: FormGroup; // formGroup to create roles
    formValPath: string[];
    createFormControlCount = 0;
    subs: Subscription[] = []; // for unsubscribe onDestroy

    fromValueForReset: any;

    hasOnlyCircularRole: boolean;

    // if true, user is dragging a role to change the order
    userIsDragging = false;

    /**
     * Outputs
     */

    @Output() onRemovePropertyField: EventEmitter<void> = new EventEmitter();

    @Output() touched: EventEmitter<void> = new EventEmitter();

    constructor(
        protected rootEpics: RootEpics,
        protected epics: PropertyFieldApiEpics,
        protected eprApi: InfEntityProjectRelApi,
        protected roleApi: InfRoleApi,
        public ngRedux: NgRedux<IAppState>,
        protected actions: PropertyFieldActions,
        protected propertyFieldService: PropertyFieldService,
        protected roleStore: NgRedux<RoleDetail>,
        protected roleActions: RoleActions,
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
        //   create the formGroup used to create/edit the propertyField's InfRole[]
        this.formGroup = this.fb.group({});
    }

    /**
     * Subcscibes to form value changes
     */
    initFormSubscription() {

        this.subs.push(this.formGroup.valueChanges.subscribe(val => {
            if (this.formGroup.valid) {

                // build a array of InfRole
                const roles: InfRole[] = [];
                Object.keys(this.formGroup.controls).forEach(key => {
                    if (this.formGroup.get(key)) {
                        roles.push(this.formGroup.get(key).value)
                    }
                })

                // send the peIt the parent form
                this.onChange(roles)
            } else {
                this.onChange(null)
            }
        }))
    }


    /**
    * Methods
    */
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), propertyFieldReducer);
        this.basePath = this.getBasePath();

        /** prepare the formGroup connection path for @ng-redux/forms */
        this.formValPath = [...this.basePath, 'formGroup'];


        this._role_list$.takeUntil(this.destroy$).subscribe(d => {
            this._role_list = d;

            if (!this.userIsDragging) this.roleDetails = U.obj2KeyValueArr(d);

            // const r = U.obj2Arr(d);
            // if (r.length == 1 && r[0].isCircular === true) this.hasOnlyCircularRole = true;
            // else this.hasOnlyCircularRole = false;

        })


        this.rootEpics.addEpic(this.epics.createEpics(this));

        // Subscribe to the activeProject, to get the pk_project needed for api call
        this.subs.push(this.ngRedux.select<Project>('activeProject').subscribe(d => this.project = d));

        this.subs.push(this.localStore.select<PropertyField>('').subscribe(d => {
            this.propertyFieldState = d
        }));

        this.subs.push(combineLatest(this.toggle$, this._property_field_form$, this._role_list$, this.isViewMode$).subscribe(res => {
            const toggle = res[0], roleStatesToCreate = res[1], _role_list = res[2], isViewMode = res[3];

            if (this.propertyFieldState) {
                // count roles of this propertyField that are in the project or currently being created
                const rolesCount = Object.keys(roleStatesToCreate || {}).length + Object.keys(_role_list || {}).length;

                // check if more roles would be possible in this role set
                const moreRolesPossible = this.propertyFieldService.moreRolesPossible(rolesCount, this.propertyFieldState);

                // assign the add button visibility
                this.addButtonVisible = (toggle === 'expanded' && moreRolesPossible && !isViewMode);

                this.removePropertyFieldBtnVisible = ((!roleStatesToCreate || roleStatesToCreate == {}) && (!_role_list || _role_list == {}));
            }
        }))


        this.init();

    }

    abstract init(): void // hook for child classes


    /**
     * Initializes the form controls
    */
    initFormCtrls() {

        const formCrtlsToRemove: string[] = [];

        // add controls for each child propertyField
        if (this.propertyFieldState && this.propertyFieldState._role_list) {
            Object.keys(this.propertyFieldState._role_list).forEach((key) => {
                if (this.propertyFieldState._role_list[key]) {

                    this.formGroup.addControl(key, new FormControl(
                        this.propertyFieldState._role_list[key].role,
                        [
                            Validators.required
                        ]
                    ))
                } else {
                    formCrtlsToRemove.push(key);
                }
            })
        }

        // remove control of removed chiild state
        formCrtlsToRemove.forEach(key => {
            this.formGroup.removeControl(key);
        })

        // assign the value after initializing all form controls
        this.fromValueForReset = this.formGroup.value;

    }



    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.subs.forEach(sub => sub.unsubscribe());
    }




    // Since we're observing an array of items, we need to set up a 'trackBy'
    // parameter so Angular doesn't tear down and rebuild the list's DOM every
    // time there's an update.
    getKey(_, item) {
        return item.key;
    }

    getBasePath = () => this.index ?
        [...this.parentPath, '_fields', this.index] :
        null;


    /**
    * Called when the users clicks on cancel to stop creating a new propertyField
    */
    removePropertyField() {
        this.onRemovePropertyField.emit()
    }


    // TODO check if this can be dropped
    /**
    * changeStandardRole - Make another child role the standard role for
    * the active project.
    *
    * @param key  the key of the child RoleState in the store tree
    * @return {void}
    */
    // changeStandardRole(input: { roleState: RoleDetail, key: string }) {

    //     const observables = [];


    //     // set loadingStdChange flag of the given child Role
    //     const inputRoleStore = this.getChildRoleStore(input.key)

    //     inputRoleStore.dispatch(this.roleActions.changeDisplayRoleLoading(true))

    //     // Create observable of api call to make the given role new standard

    //     observables.push(this.eprApi.patchAttributes(
    //         input.roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
    //         {
    //             is_standard_in_project: true
    //         }
    //     ))

    //     // Get all Display Roles to disable (should be only one)

    //     const rolesToChange: RoleDetail[] = [];

    //     Object.keys(this._role_list).forEach(key => {
    //         const roleState: RoleDetail = this._role_list[key];
    //         const isDisplayRole = RoleService.isDisplayRole(
    //             roleState.isOutgoing,
    //             roleState.isDisplayRoleForDomain,
    //             roleState.isDisplayRoleForRange
    //         )
    //         if (roleState && isDisplayRole) {

    //             // set loadingStdChange flag of the RoleState
    //             this.getChildRoleStore(key).dispatch(this.roleActions.changeDisplayRoleLoading(true))

    //             // push the RoleState to an array that will be used later
    //             rolesToChange.push(roleState);

    //             // Create observable of api call to disable the old standard
    //             observables.push(this.eprApi.patchAttributes(
    //                 roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
    //                 {
    //                     is_standard_in_project: false
    //                 }
    //             ))
    //         }
    //     });

    //     this.subs.push(combineLatest(observables)
    //         .subscribe(
    //             (value) => {

    //                 // update the epr of the new Std in store
    //                 const isDisplayRole = value[0].is_standard_in_project,
    //                     isOutgoing = input.roleState.isOutgoing;
    //                 inputRoleStore.dispatch(this.roleActions.changeDisplayRoleSucceeded(isDisplayRole, isOutgoing))

    //                 // update the former display role states (should be only one) in store
    //                 for (let i = 0; i < rolesToChange.length; i++) {
    //                     const isDisplayRole = RoleService.isDisplayRole(
    //                         rolesToChange[i].isOutgoing,
    //                         rolesToChange[i].isDisplayRoleForDomain,
    //                         rolesToChange[i].isDisplayRoleForRange
    //                     )
    //                     this.getChildRoleStore(roleStateKey(rolesToChange[i]))
    //                         .dispatch(this.roleActions.changeDisplayRoleSucceeded(false, rolesToChange[i].isOutgoing))
    //                 }

    //             }))

    // }


    getChildRoleStore(key): ObservableStore<RoleDetail> {
        return this.roleStore.configureSubStore([... this.basePath, '_role_list', key], roleReducer);
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
        const roleStates = Object.assign({}, this.propertyFieldState._property_field_form._role_create_list);
        delete roleStates[key];
        this.localStore.dispatch(this.actions.roleCreationCancelled(roleStates));

    }

    /**
    *  called when user cancels to create new roles
    *
    */
    cancelCreateRoles() {

        /** remove the RoleState from state */
        this.localStore.dispatch(this.actions.stopCreateNewRole());

    }


    /**
    * removeFromProject - called when user removes a role (nested) from project
    */
    removeFromProject(key: string) {
        const roleState = this.propertyFieldState._role_list[key];

        const roleToRemove = StateToDataService.roleStateToRoleToRelate(roleState)

        this.subs.push(this.roleApi.changeRoleProjectRelation(
            this.project.pk_project, false, roleToRemove
        ).subscribe(result => {
            this.localStore.dispatch(this.actions.roleRemovedFromProject(key, roleState))
        }))

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


    onDragStart() {
        this.userIsDragging = true;
    }

    /**
   * called when a RoleDetail is dragged
   */
    // onDrag($event: { key: string, value: RoleDetail }) {

    //     this.userIsDragging = false;

    //     const changedEprs: InfEntityProjectRel[] = []

    //     // check, if needs update
    //     for (let i = 0; i < this.roleDetails.length; i++) {

    //         const epr = U.eprFromRoleDetail(this.roleDetails[i].value);

    //         // if the ord_num is wrong
    //         if (epr.ord_num != i) {



    //             changedEprs.push({
    //                 ...epr,
    //                 ord_num: i,
    //             })
    //         }
    //     }

    //     if (changedEprs.length) this.localStore.dispatch(this.actions.updateOrder(changedEprs));


    // }

    onChangeOrder(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.roleDetails, event.previousIndex, event.currentIndex);

        const changedEprs: InfEntityProjectRel[] = []

        // check, if needs update
        for (let i = 0; i < this.roleDetails.length; i++) {

            const epr = U.eprFromRoleDetail(this.roleDetails[i].value);
            // if the ord_num is wrong
            if (epr.ord_num != i) {
                changedEprs.push({ ...epr, ord_num: i, })
            }
        }

        if (changedEprs.length) this.localStore.dispatch(this.actions.updateOrder(changedEprs, event));

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


}
