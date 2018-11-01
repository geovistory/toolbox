import { NgRedux } from '@angular-redux/store';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRel, InfEntityProjectRelApi, InfRole, InfRoleApi, U } from 'app/core';
import { RoleDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { clone } from 'ramda';
import { RoleActions } from '../role/role.actions';
import { ClassService } from '../shared/class.service';
import { RoleSetService } from '../shared/role-set.service';
import { PropertyFieldActions } from './role-set.actions';
import { PropertyFieldBase } from './role-set.base';
import { PropertyFieldApiEpics } from './role-set.epics';

export abstract class PropertyFieldAddCtrlBase extends PropertyFieldBase {


  ctrlsInitialized = false;

  init(): void {
    this.initRoleSetAddCtrlBaseChild()
    this.initFormCtrls()

  }


  abstract initRoleSetAddCtrlBaseChild(): void;

  constructor(
    protected rootEpics: RootEpics,
    protected epics: PropertyFieldApiEpics,
    protected eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PropertyFieldActions,
    protected roleSetService: RoleSetService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, classService, fb)
  }


  /**
   * Initializes the form controls
  */
  initFormCtrls() {

    // add controls for each child roleSet unless it is circular
    if (this.roleSetState && this.roleSetState._role_list) {


      Object.keys(this.roleSetState._role_list).forEach((key) => {
        if (this.roleSetState._role_list[key]) {

          let roleCtrl: FormControl;

          // for the circular case
          if (this.roleSetState._role_list[key].isCircular == true) {
            roleCtrl = new FormControl(null);
          } else {
            // for normal cases that are not circular
            roleCtrl = new FormControl(null, [Validators.required]);
          }

          this.formGroup.addControl(key, roleCtrl)



        }
      })
    }
    this.ctrlsInitialized = true;
  }

  initFormCtrlValues(roles: InfRole[]) {

    // add vals for each child roleSet unless it is circular
    if (this.roleSetState && this.roleSetState._role_list) {

      // Find the communities display range favorite
      const favoriteDisplayForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoleStates(this.roleSetState._role_list);

      Object.keys(this.roleSetState._role_list).forEach((key) => {
        if (this.roleSetState._role_list[key]) {

          const roleCtrl = this.formGroup.get(key);

          const role = this.roleSetState._role_list[key].role;

          // for the circular case
          if (this.roleSetState._role_list[key].isCircular == true) {
            roleCtrl.setValue(role);
          } else {
            // for normal cases that are not circular
            // if this role is most used to create the display label of range
            const is_standard_in_project = (role.pk_entity == favoriteDisplayForRangePk);

            const epr = role.entity_version_project_rels ?
              role.entity_version_project_rels[0] : {
                is_in_project: true,
                is_standard_in_project
              } as InfEntityProjectRel
            role.entity_version_project_rels = [epr];

            roleCtrl.setValue(role);
          }

        }
      })
    }

  }

  /**
 * Subcscibes to form value changes
 */
  initFormSubscription() {

    /**
   * subscribe to each form control (role) in order to
   * manage dependencies between the roles of the RoleSet
   */
    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.formGroup.get(key)) {
        this.formGroup.get(key).valueChanges.subscribe((ctrlVal: InfRole) => {
          // if is display role, disable other display roles
          if (ctrlVal && ctrlVal.entity_version_project_rels && ctrlVal.entity_version_project_rels[0].is_standard_in_project) {
            this.disableDisplayRoleExeptFor(key)
          }
        })
      }
    })

    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      this.emitVal()
    }))
  }

  emitVal() {

    // build a array of InfRole
    const roles: InfRole[] = [];
    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.formGroup.get(key)) {
        const role = this.formGroup.get(key).value
        roles.push(role)
      }
    })

    if (this.formGroup.valid) {

      // send the peIt the parent form
      this.onChange(roles)
    } else {
      this.onChange(null)
    }
  }

  disableDisplayRoleExeptFor = (ctrlKey) => {
    U.obj2KeyValueArr(this.formGroup.controls).forEach(item => {
      if (item.key != ctrlKey) {
        // disable is_standard_in_project
        const ctrl: AbstractControl = item.value;
        const role: InfRole = clone(ctrl.value);

        role.entity_version_project_rels[0] = {
          ...role.entity_version_project_rels[0],
          is_standard_in_project: false
        } as InfEntityProjectRel

        ctrl.setValue(role, {
          onlySelf: false,
          emitEvent: false
        });

      }
    })
  }


  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {
    if (this.ctrlsInitialized) this.initFormCtrlValues(roles)

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.initFormSubscription();

  }

}
