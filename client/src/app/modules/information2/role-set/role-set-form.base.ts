import { select, WithSubStore } from '@angular-redux/store';
import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';

import { RoleDetailList, RoleSetForm } from '../information.models';
import { roleSetReducer } from './role-set.reducer';
import { InfEntityProjectRel, InfRole, U } from 'app/core';
import { createTimelineInstruction } from '@angular/animations/browser/src/dsl/animation_timeline_instruction';

@AutoUnsubscribe()
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: roleSetReducer
})
export abstract class RoleSetFormBase implements OnInit {


    @Input() parentPath: string[];

    @Output() cancelCreateRoles: EventEmitter<void> = new EventEmitter()
    @Output() startCreateNewRole: EventEmitter<void> = new EventEmitter()
    @Output() createRoles: EventEmitter<InfRole[]> = new EventEmitter()

    @select() _role_set_form$: Observable<RoleSetForm>

    _role_set_form: RoleSetForm;
    _role_create_list: RoleDetailList;
    _role_add_list: RoleDetailList;


    getBasePath = () => [...this.parentPath];

    roleSetFormPath: string[];

    subs: Subscription[] = []; // for unsubscribe onDestroy

    createForm: FormGroup; // createForm to create roles
    addForm: FormGroup; // addForm to add existing roles

    constructor(protected fb: FormBuilder) {
        this.initForms();

        this.initFormSubscription();

    }

    ngOnInit() {
        this.roleSetFormPath = [...this.parentPath, '_role_set_form'];

        this.subs.push(
            this._role_set_form$.subscribe(d => {
                this._role_set_form = d;
                if (d) {
                    this._role_create_list = d._role_create_list;
                    this._role_add_list = d._role_add_list;
                }

                this.initFormCtrls();

            })
        )
    }

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
            if (this.addForm.valid) {

            }
        }))



        this.subs.push(this.createForm.valueChanges.subscribe(val => {
            if (this.createForm.valid) {

            }
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
    initFormCtrls() {


        // add controls for each role to create
        if (this._role_set_form && this._role_set_form._role_create_list) {
            Object.keys(this._role_set_form._role_create_list).forEach((key) => {
                const roleDetail = this._role_set_form._role_create_list[key]
                if (roleDetail) {
                    const role = roleDetail.role;
                    const roleCtrl = new FormControl(role, [Validators.required]);
                    this.createForm.addControl(key, roleCtrl)
                }
            })
        }

        // add controls for each role to add
        if (this._role_set_form && this._role_set_form._role_add_list) {
            Object.keys(this._role_set_form._role_add_list).forEach((key) => {
                const roleDetail = this._role_set_form._role_add_list[key]
                if (roleDetail) {

                    const role = roleDetail.role;

                    // prepare the role for relation with project
                    role.entity_version_project_rels = [
                        role.entity_version_project_rels ?
                            role.entity_version_project_rels[0] : {
                                is_in_project: false,
                                is_standard_in_project: false
                            } as InfEntityProjectRel
                    ]

                    const roleCtrl = new FormControl(role, [Validators.required]);
                    this.addForm.addControl(key, roleCtrl)
                }
            })
        }

    }

    abstract submit(): void;

}
