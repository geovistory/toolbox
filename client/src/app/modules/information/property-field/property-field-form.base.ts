import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnInit, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState, ProInfoProjRel, InfRole, U } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription, Subject } from 'rxjs';

import { RoleDetailList, PropertyField, PropertyFieldForm, RoleDetail, FieldLabel } from 'app/core/state/models';
import { propertyFieldReducer } from './property-field.reducer';
import { PropertyFieldActions } from './property-field.actions';

// @AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: propertyFieldReducer
})
export abstract class PropertyFieldFormBase implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();


  @Input() parentPath: string[];

  @Output() addFormChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() createFormChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() onCancelCreateRoles: EventEmitter<void> = new EventEmitter()
  @Output() onStartCreateNewRole: EventEmitter<void> = new EventEmitter()
  @Output() onCreateRoles: EventEmitter<InfRole[]> = new EventEmitter()

  @select() _property_field_form$: Observable<PropertyFieldForm>
  @select() label$: Observable<FieldLabel>

  _property_field_form: PropertyFieldForm;
  _role_create_list: RoleDetailList = {};
  _role_add_list: RoleDetailList;



  propertyFieldFormPath: string[];

  subs: Subscription[] = []; // for unsubscribe onDestroy

  createForm: FormGroup; // createForm to create roles
  addForm: FormGroup; // addForm to add existing roles

  localStore: ObservableStore<PropertyField>;

  createFormControlCount = 0;

  constructor(
    protected fb: FormBuilder,
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected actions: PropertyFieldActions,

  ) {


    this.initForms();

    // this.initFormSubscription();

  }

  getBasePath = () => [...this.parentPath];


  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  ngOnInit() {

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), propertyFieldReducer)

    this.propertyFieldFormPath = [...this.parentPath, '_property_field_form'];

    this.initPropertyFieldFormBaseChild()

  }

  abstract initPropertyFieldFormBaseChild(): void

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

  /**
   * Validates that at least one item must be selected
   * @param group
   */
  addFormValidator(group: FormGroup) {
    // const inProj = U.obj2Arr(group.controls).filter(ctrl => {
    //     const role: InfRole = ctrl.value;
    //     return role && role.entity_version_project_rels &&
    //         role.entity_version_project_rels[0] &&
    //         role.entity_version_project_rels[0].is_in_project
    // })
    const inProj = U.obj2Arr(group.controls).filter(ctrl => ctrl.value);

    if (inProj.length < 1) {
      return {
        oneItemRequired: true
      }
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
    // if (this._property_field_form && this._property_field_form._role_create_list) {
    //     Object.keys(this._property_field_form._role_create_list).forEach((key) => {
    //         const roleDetail = this._property_field_form._role_create_list[key]
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
      if (_role_add_list[key]) {
        const roleCtrl = new FormControl(false, [Validators.required]);
        this.addForm.addControl(key, roleCtrl)
      }
    })

    // init the form subscription

    this.subs.push(this.addForm.valueChanges.subscribe(val => {
      this.addFormChange.emit(this.addForm)
    }))

    // add the control values
    // setTimout is needed in order to make the form ctrls work…
    setTimeout(() => {
      Object.keys(_role_add_list).forEach((key) => {
        const roleDetail = _role_add_list[key]
        if (roleDetail && roleDetail.role) {

          // const role = roleDetail.role;

          // // prepare the role for relation with project
          // role.entity_version_project_rels = [
          //     role.entity_version_project_rels ?
          //         role.entity_version_project_rels[0] : {
          //             is_in_project: false,
          //             is_standard_in_project: false
          //         } as InfEntityProjectRel
          // ]
          this.addForm.get(key).setValue(false)
        }
      })
    }, 0)


    this.ref.detectChanges()
  }

  abstract submit(): void;

}
