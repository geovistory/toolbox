import { NgRedux } from '@angular-redux/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRel, InfEntityProjectRelApi, InfRoleApi, InfRole, U } from 'app/core';
import { RoleSetActions } from './role-set.actions';
import { RoleSetService } from '../shared/role-set.service';
import { RoleDetail } from '../information.models';
import { RoleActions } from '../role/role.actions';
import { StateCreatorService } from '../shared/state-creator.service';
import { ClassService } from '../shared/class.service';
import { RoleSetBase } from './role-set.base';
import { clone } from 'ramda'

export abstract class RoleSetAddCtrlBase extends RoleSetBase {

  init(): void {
    this.initRoleSetAddCtrlBaseChild()
  }

  abstract initRoleSetAddCtrlBaseChild(): void;

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
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


  /**
   * Initializes the form controls
  */
  initFormCtrls() {


    // add controls for each child roleSet
    if (this.roleSetState && this.roleSetState._role_list) {

      // Find  handle the communities display range favorite
      const favoriteDisplayForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoleStates(this.roleSetState._role_list);

      Object.keys(this.roleSetState._role_list).forEach((key) => {
        if (this.roleSetState._role_list[key]) {
          let role = this.roleSetState._role_list[key].role;

          if (this.roleSetState._role_list[key].isCircular !== true) {
            // if this role is most used to create the display label of range 
            const is_standard_in_project = (role.pk_entity == favoriteDisplayForRangePk);

            const epr = role.entity_version_project_rels ?
              role.entity_version_project_rels[0] : {
                is_in_project: true,
                is_standard_in_project
              } as InfEntityProjectRel
            role.entity_version_project_rels = [epr];
          }

          const roleCtrl = new FormControl(role, [Validators.required]);
          this.formGroup.addControl(key, roleCtrl)


          /**
           * subscribe to each form control (role) in order to
           * manage dependencies between the roles of the RoleSet 
           */
          roleCtrl.valueChanges.subscribe((ctrlVal: InfRole) => {
            // if is display role, disable other display roles
            if (ctrlVal && ctrlVal.entity_version_project_rels && ctrlVal.entity_version_project_rels[0].is_standard_in_project) {
              this.disableDisplayRoleExeptFor(key)
            }
          })

        }
      })
    }
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

  disableDisplayRoleExeptFor = (ctrlKey) => {
    U.obj2KeyValueArr(this.formGroup.controls).forEach(item => {
      if (item.key != ctrlKey) {
        // disable is_standard_in_project
        const ctrl: FormControl = item.value;
        let role: InfRole = clone(ctrl.value);

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

}