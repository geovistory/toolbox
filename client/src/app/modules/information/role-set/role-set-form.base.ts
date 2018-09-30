import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRel, InfRole, U } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';

import { RoleDetailList, RoleSet, RoleSetForm, RoleDetail, RoleSetLabel } from 'app/core/state/models';
import { roleSetReducer } from './role-set.reducer';
import { RoleSetActions } from './role-set.actions';

@AutoUnsubscribe()
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: roleSetReducer
})
export abstract class RoleSetFormBase implements OnInit {


    @Input() parentPath: string[];

    @Output() addFormChange: EventEmitter<FormGroup> = new EventEmitter();
    @Output() createFormChange: EventEmitter<FormGroup> = new EventEmitter();
    @Output() onCancelCreateRoles: EventEmitter<void> = new EventEmitter()
    @Output() onStartCreateNewRole: EventEmitter<void> = new EventEmitter()
    @Output() onCreateRoles: EventEmitter<InfRole[]> = new EventEmitter()

    @select() _role_set_form$: Observable<RoleSetForm>
    @select() label$: Observable<RoleSetLabel>

    _role_set_form: RoleSetForm;
    _role_create_list: RoleDetailList = {};
    _role_add_list: RoleDetailList;


    getBasePath = () => [...this.parentPath];


    // Since we're observing an array of items, we need to set up a 'trackBy'
    // parameter so Angular doesn't tear down and rebuild the list's DOM every
    // time there's an update.
    getKey(_, item) {
        return item.key;
    }

    roleSetFormPath: string[];

    subs: Subscription[] = []; // for unsubscribe onDestroy

    createForm: FormGroup; // createForm to create roles
    addForm: FormGroup; // addForm to add existing roles

    localStore: ObservableStore<RoleSet>;

    createFormControlCount: number = 0;

    constructor(
        protected fb: FormBuilder,
        protected ngRedux: NgRedux<IAppState>,
        protected ref: ChangeDetectorRef,
        protected actions: RoleSetActions,

    ) {


        this.initForms();

        // this.initFormSubscription();

    }

    ngOnInit() {

        this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), roleSetReducer)

        this.roleSetFormPath = [...this.parentPath, '_role_set_form'];

        this.initRoleSetFormBaseChild()

        // this._role_add_list$.subscribe(d => {
        //     if(d) this.initAddFormCtrls(d);
        // })

        // this.initFormCtrls();

        // this.subs.push(
        //     this._role_set_form$.subscribe(d => {
        //         this._role_set_form = d;
        //         if (d) {
        //             this._role_create_list = d._role_create_list;
        //             this._role_add_list = d._role_add_list;
        //             this.initFormCtrls();
        //         }


        //     })
        // )


    }

    abstract initRoleSetFormBaseChild(): void

    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }



    /**
   * Inits the addForm used in template.
   */
    initForms() {
        this.addForm = this.fb.group({}, {
            validator: this.addFormValidator.bind(this)
        });
        this.createForm = this.fb.group({});
    }


    /**
     * Subcscibes to form value changes
     */
    initFormSubscription() {

        this.subs.push(this.addForm.valueChanges.subscribe(val => {
            this.addFormChange.emit(this.addForm)
        }))



        this.subs.push(this.createForm.valueChanges.subscribe(val => {
            this.createFormChange.emit(this.createForm)
        }))
    }

    addFormValidator(group: FormGroup) {
        const inProj = U.obj2Arr(group.controls).filter(ctrl => {
            const role: InfRole = ctrl.value;
            return role && role.entity_version_project_rels &&
                role.entity_version_project_rels[0] &&
                role.entity_version_project_rels[0].is_in_project
        })

        if (inProj.length < 1) return {
            oneItemRequired: true
        }
    }

    /**
      * Initializes the form controls
     */
    initCreateFormCtrls(roleDetail: RoleDetail) {


        /** add a form control */
        const formControlName = 'new_role_' + this.createFormControlCount;
        this.createFormControlCount++;
        this.createForm.addControl(formControlName, new FormControl(roleDetail.role, [Validators.required]))

        /** update the state */
        this._role_create_list[formControlName] = roleDetail;
        this.localStore.dispatch(this.actions.startCreateNewRole(this._role_create_list))

        this.ref.detectChanges()

        // // add controls for each role to create
        // if (this._role_set_form && this._role_set_form._role_create_list) {
        //     Object.keys(this._role_set_form._role_create_list).forEach((key) => {
        //         const roleDetail = this._role_set_form._role_create_list[key]
        //         if (roleDetail) {
        //             const role = roleDetail.role;
        //             const roleCtrl = new FormControl(role, [Validators.required]);
        //             this.createForm.addControl(key, roleCtrl)
        //         }
        //     })
        // }
    }

    /**
    * Initializes the form controls
    */
    initAddFormCtrls(_role_add_list: RoleDetailList) {
        this._role_add_list = _role_add_list;

        // add controls for each role to add
        Object.keys(_role_add_list).forEach((key) => {
            if(_role_add_list[key]){
                const roleCtrl = new FormControl(null, [Validators.required]);
                this.addForm.addControl(key, roleCtrl)
            }
        })

        // init the form subscription

        this.subs.push(this.addForm.valueChanges.subscribe(val => {
            this.addFormChange.emit(this.addForm)
        }))

        // add the control values
        // setTimout is needed in order to make the form ctrls work…
        setTimeout(()=>{
            Object.keys(_role_add_list).forEach((key) => {
                const roleDetail = _role_add_list[key]
                if (roleDetail && roleDetail.role) {
    
                    const role = roleDetail.role;
    
                    // prepare the role for relation with project
                    role.entity_version_project_rels = [
                        role.entity_version_project_rels ?
                            role.entity_version_project_rels[0] : {
                                is_in_project: false,
                                is_standard_in_project: false
                            } as InfEntityProjectRel
                    ]
                    this.addForm.get(key).setValue(role)
                }
            })
        }, 0)


        this.ref.detectChanges()
    }

    abstract submit(): void;

}
