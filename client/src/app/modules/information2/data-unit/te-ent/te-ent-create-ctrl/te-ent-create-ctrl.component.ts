import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { TeEntCtrlBase } from '../te-ent-ctrl.base';
import { NgRedux } from '@angular-redux/store';
import { TeEntActions } from '../te-ent.actions';
import { FormBuilder, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { InfTemporalEntity, InfRole, U, UiContext, ComConfig } from 'app/core';
import { pick } from 'ramda';

@Component({
  selector: 'gv-te-ent-create-ctrl',
  templateUrl: './te-ent-create-ctrl.component.html',
  styleUrls: ['./te-ent-create-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntCreateCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntCreateCtrlComponent extends TeEntCtrlBase {


  parentRole: InfRole;

  uiContext: UiContext;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder
  ) {
    super(ngRedux, actions, fb)
  }


  onInitTeEntBaseChild(): void { 
    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];
  }

  initFormCtrls(): void {

    // add controls for each roleSet of _roleSet_list
    this.subs.push(this._roleSet_list$.subscribe(roleSetList => {
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
    }))

  }

  subscribeFormChanges(): void {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {

      // build the role
      let role = new InfRole(pick(['fk_entity', 'fk_property'], this.parentRole));

      // build a teEnt with all pi_roles given by the form's controls 
      role.temporal_entity = {
        fk_class: this.teEntState.dfhClass.dfh_pk_class
      } as InfTemporalEntity;
      role.temporal_entity.te_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          role.temporal_entity.te_roles = [...role.temporal_entity.te_roles, ...this.formGroup.get(key).value]
        }
      })

      // try to retrieve a appellation label
      this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(role.temporal_entity);

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

}
