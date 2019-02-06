import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ComConfig, InfRole, InfTemporalEntity, U, UiContext, AddOption, PropertyField, ExistenceTimeDetail, FieldLabel, FieldList } from 'app/core';
import { pick } from 'ramda';
import { TeEntCtrlBase } from '../te-ent-ctrl.base';
import { TeEntActions } from '../te-ent.actions';
import { RootEpics } from 'app/core/store/epics';
import { EntityAPIEpics } from '../../entity.epics';
import { createExistenceTimeDetail } from 'app/core/state/services/state-creator';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { getTeEntAddOptions } from '../te-ent-editable/te-ent-editable.component';

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

  addOptionsTeEnt$: Observable<AddOption[]>;


  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder,
    protected rootEpics: RootEpics,
    protected entityEpics: EntityAPIEpics
  ) {
    super(ngRedux, actions, fb, rootEpics, entityEpics);

  }


  onInitTeEntBaseChild(): void {
    // this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE];
    this.addOptionsTeEnt$ = getTeEntAddOptions(this.fkClass$, this.pkUiContext$, this.crm$, new BehaviorSubject({}), this._fields$)
  }


  initFormCtrls(): void {

    // add controls for each propertyField of _fields
    this._fields$.takeUntil(this.destroy$).subscribe(fields => {

      if (fields) {
        Object.keys(fields).forEach((key) => {
          if (fields[key]) {

            this.formGroup.addControl(key, new FormControl(
              fields[key].roles,
              [
                Validators.required
              ]
            ))
          }

        })
      }
    })

  }

  subscribeFormChanges(): void {
    this.formGroup.valueChanges.takeUntil(this.destroy$).subscribe(val => {

      // build the role
      const role = new InfRole(pick(['fk_entity', 'fk_property'], this.parentRole) as InfRole);

      // build a teEnt with all pi_roles given by the form's controls
      role.temporal_entity = {
        fk_class: this.teEntState.fkClass
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
      } else {
        this.onChange(null)
      }
    })
  }

  onChange(role: InfRole): void {
    console.error('called before registerOnChange')
  }

  writeValue(parentRole: InfRole): void {
    this.parentRole = parentRole ? parentRole : new InfRole();
  }

  addOptionSelected($event) {

    const o: AddOption = $event.item;

    // if this option is already added
    if (o.added) {

      this.stopSelectProperty();

    } else {

      if (o.uiElement.propertyFieldKey) {

        // if this is a role set

        // prepare the PropertyField
        const newPropertyField = new PropertyField(this.classConfig.propertyFields[o.uiElement.propertyFieldKey]);

        // prepare the new role
        const newRole = {
          fk_property: newPropertyField.property.dfh_pk_property,
          entity_version_project_rels: [{
            is_in_project: true
          }]
        } as InfRole;


        this.addPropertyField(new PropertyField(this.classConfig.propertyFields[o.uiElement.propertyFieldKey]), [newRole], { pkUiContext: this.localStore.getState().pkUiContext })

      } else if (o.uiElement.fk_class_field) {

        // if this is a prop set
        // TODO Make this generic for all class fields
        if (o.uiElement.fk_class_field === ComConfig.PK_CLASS_FIELD_WHEN) {

          const existenceTimeDetail = createExistenceTimeDetail(
            new ExistenceTimeDetail({ toggle: 'expanded' }),
            [],
            this.ngRedux.getState().activeProject.crm,
            { pkUiContext: this.localStore.getState().pkUiContext }
          )
          this.addPropSet('_field_48', existenceTimeDetail)

        }

      }

    }

  }


}
