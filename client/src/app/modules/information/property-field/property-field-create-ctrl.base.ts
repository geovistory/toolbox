import { NgRedux } from '@angular-redux/store';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRel, InfEntityProjectRelApi, InfRole, InfRoleApi, U } from 'app/core';
import { RoleDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { clone } from 'ramda';
import { RoleActions } from '../role/role.actions';
import { ClassService } from '../shared/class.service';
import { PropertyFieldService } from '../shared/property-field.service';
import { PropertyFieldActions } from './property-field.actions';
import { PropertyFieldBase } from './property-field.base';
import { PropertyFieldApiEpics } from './property-field.epics';

export abstract class PropertyFieldCreateCtrlBase extends PropertyFieldBase {

  init(): void {
    this.initPropertyFieldCreateCtrlBaseChild()
  }

  abstract initPropertyFieldCreateCtrlBaseChild(): void;

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
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)
  }


  /**
   * Initializes the form controls
  */
  initFormCtrls() {


    // add controls for each child propertyField
    if (this.propertyFieldState && this.propertyFieldState._role_list) {

      // Find  handle the communities display range favorite
      const favoriteDisplayForRangePk = PropertyFieldService.getDisplayRangeFavoriteOfRoleStates(this.propertyFieldState._role_list);

      Object.keys(this.propertyFieldState._role_list).forEach((key) => {
        if (this.propertyFieldState._role_list[key]) {
          let role = this.propertyFieldState._role_list[key].role;

          if (this.propertyFieldState._role_list[key].isCircular !== true) {
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
           * manage dependencies between the roles of the PropertyField 
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
        const ctrl: AbstractControl = item.value;
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