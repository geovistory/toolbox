import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfRole, InfTemporalEntity, U, InfEntityProjectRel } from 'app/core';

import { TeEntCtrlBase } from '../te-ent-ctrl.base';
import { TeEntActions } from '../te-ent.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { slideInOut } from '../../../shared/animations';

@AutoUnsubscribe()
@Component({
  selector: 'gv-te-ent-add-ctrl',
  templateUrl: './te-ent-add-ctrl.component.html',
  styleUrls: ['./te-ent-add-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOut],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntAddCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntAddCtrlComponent extends TeEntCtrlBase {


  parentRole: InfRole;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder
  ) {
    super(ngRedux, actions, fb)
    console.log('TeEntAddCtrlComponent')
  }

  initFormCtrls(): void {
    if (this.localStore.getState()) {

      // add controls for each roleSet of _roleSet_list
      const roleSetList = this.localStore.getState()._roleSet_list;

      // this.subs.push(this._roleSet_list$.subscribe(roleSetList => {

      if (roleSetList)
        Object.keys(roleSetList).forEach((key) => {
          if (roleSetList[key]) {

            this.formGroup.addControl(key, new FormControl(
              roleSetList[key].roles,
              [
                Validators.required
              ]
            ))
          }

        })
      // }))
    }

  }

  subscribeFormChanges(): void {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {

      // build the role
      let role = new InfRole(this.parentRole);

      // build a teEnt with all pi_roles given by the form's controls 
      if (this.teEntState) {
        role.temporal_entity = new InfTemporalEntity(this.teEntState.teEnt);
        role.temporal_entity.te_roles = [];
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.get(key)) {
            role.temporal_entity.te_roles = [...role.temporal_entity.te_roles, ...this.formGroup.get(key).value]
          }
        })

        // create the epr
        role.temporal_entity.entity_version_project_rels = [{
          is_in_project: true,
        } as InfEntityProjectRel];

        // try to retrieve a appellation label
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(role.temporal_entity);
      }

      if (this.formGroup.valid) {
        // send the teEnt the parent form
        this.onChange(role)
      }
      else {
        this.onChange(null)
      }
    }))
  }

  onChange(role: InfRole): void {
    console.error('called before registerOnChange')
  }

  writeValue(parentRole: InfRole): void {
    this.parentRole = parentRole ? parentRole : new InfRole();
  }

  onInitTeEntBaseChild(): void { }



  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }

}