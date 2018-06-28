import { NgRedux, ObservableStore, WithSubStore, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IAppState, InfRole, InfTimePrimitive, InfEntityProjectRel, InfTemporalEntity, InfTemporalEntityApi, U } from 'app/core';
import { union } from 'ramda';

import { roleSetKey } from '../../information.helpers';
import { ExistenceTimeDetail, RoleSet, TeEntDetail, RoleDetail, RoleDetailList, RoleSetList, ExTimeModalMode, ExistenceTimeEdit } from '../../information.models';
import { DfhConfig } from '../../shared/dfh-config';
import { StateCreatorService } from '../../shared/state-creator.service';
import { ExistenceTimeActions } from '../existence-time.actions';
import { existenceTimeReducer } from '../existence-time.reducer';
import { Subscription, Observable } from 'rxjs';
import { dropLast } from 'ramda'
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { ExTimeEditActions } from './existence-time-edit.actions';
import { existenceTimeEditReducer } from './existence-time-edit.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeEditReducer
})
@Component({
  selector: 'gv-existence-time-edit',
  templateUrl: './existence-time-edit.component.html',
  styleUrls: ['./existence-time-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExistenceTimeEditComponent extends ExTimeEditActions implements OnInit {

  @Input() basePath: string[]
  getBasePath = () => this.basePath;

  @Output() stopEditing: EventEmitter<void> = new EventEmitter();

  @Output() submitted: EventEmitter<ExistenceTimeDetail> = new EventEmitter();


  _roleSet_list: RoleSetList;
  @select() _roleSet_list$: Observable<RoleSetList>;
  @select() ontoInfoVisible$: Observable<boolean>;
  @select() helpVisible$: Observable<boolean>
  @select() mode$: Observable<ExTimeModalMode>

  localStore: ObservableStore<ExistenceTimeDetail>
  parentTeEntStore: ObservableStore<TeEntDetail>; // needed for creating a value to send to api

  formGroup: FormGroup;

  // true, once user clicked on save
  submitClicked = false;

  // From Value given on Init. Need to be removed from project, if edited
  initialFormVal;

  subs: Subscription[] = [];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: ExistenceTimeActions,
    protected stateCreator: StateCreatorService,
    protected teEntApi: InfTemporalEntityApi,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super();

    this.initForm();

    this.initFormSubscription();

  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeEditReducer);
    this.parentTeEntStore = this.ngRedux.configureSubStore(dropLast(2, this.basePath), teEntReducer)

    this.initShortCuts(this.localStore.getState())
    this.initFormCtrls();

    this.subs.push(this.localStore.select<ExistenceTimeEdit>('').subscribe(d => {
      if (d) {
        this._roleSet_list = d._roleSet_list;
      }
    }))
  }


  initShortCuts(state: ExistenceTimeEdit) {

    // If init in one-date mode and the roleSet for "At some time within" is not yet there 
    if (state.mode === 'one-date' && (state._roleSet_list === undefined || state._roleSet_list._72_outgoing === undefined)) {
      this.addRoleSet(72)
    }

    // If init in begin-end mode and the roleSet for "Begin" is not yet there 
    if (state.mode === 'begin-end' && (state._roleSet_list === undefined || state._roleSet_list._150_outgoing === undefined)) {
      this.addRoleSet(150)
    }

    // If init in begin-end mode and the roleSet for "End" is not yet there 
    if (state.mode === 'begin-end' && (state._roleSet_list === undefined || state._roleSet_list._151_outgoing === undefined)) {
      this.addRoleSet(151)
    }
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngAfterViewInit() {
    this.initialFormVal = this.formGroup.value;
  }


  /**
   * Inits the formGroup used in template
   */
  initForm() {
    this.formGroup = this.fb.group({});
  }

  /**
 * Takes the given role sets and adds a form control for each of them.
 * Called by this class during ngOninit.
*/
  initFormCtrls() {

    const rs = this.localStore.getState()._roleSet_list;

    // iterate over roleSets of the existence time state
    if (rs)
      Object.keys(rs).forEach(key => {
        if (rs[key]) {

          const ctrl = new FormControl(null, [Validators.required]);

          this.formGroup.addControl(key, ctrl)

        }
      })
  }


  /**
   * Subcscibes to form value changes
   */
  initFormSubscription() {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

      }
    }))
  }


  addRoleSet = (fkProperty: number) => {

    // find the outgoing roleSet to add
    const roleSetTemplate: RoleSet = {
      ...this.localStore.getState().outgoingRoleSets.find(rs => rs.property.dfh_pk_property == fkProperty),
      // _role_set_form: {}
    }

    const role = new InfRole();
    role.time_primitive = new InfTimePrimitive();
    role.time_primitive.fk_class = DfhConfig.CLASS_PK_TIME_PRIMITIVE;
    role.fk_property = roleSetTemplate.property.dfh_pk_property

    // update the state
    this.stateCreator.initializeRoleSet([role], roleSetTemplate).subscribe(roleSet => {
      this.localStore.dispatch(this.roleSetAdded({ [roleSetKey(roleSet)]: roleSet }))
    })

    // add a form control
    this.formGroup.addControl(
      roleSetKey(roleSetTemplate), new FormControl(
        [role],
        [
          Validators.required
        ]
      )
    )

    this.submitClicked = false;
  };




  /**
  * called, when user removes a property leading to TimePrimitive
  */
  removeRoleSet(key: string) {

    // update the state
    this.localStore.dispatch(this.roleSetRemoved(key))

    // remove the form control
    setTimeout(() => {
      this.formGroup.removeControl(key),
        this.ref.detectChanges()
    }, 0)

  }


  /**
   * Called when a user submits a new existence time
   */
  onSubmitExistenceTime() {

    this.submitClicked = true;

    if (this.formGroup.valid) {
      const newCtrls = this.formGroup.value;
      const initCtrls = this.initialFormVal;


      const keys = union(Object.keys(newCtrls), Object.keys(initCtrls))

      let rolesToAdd: InfRole[] = []
      let rolesToRemove: InfRole[] = []
      let unchangedRoles: InfRole[] = []



      // make all roles to add and all roles to remove
      keys.forEach(key => {
        const newRoles: InfRole[] = newCtrls[key], initRoles: InfRole[] = initCtrls[key];

        // if the control was added
        if (!initRoles) {
          // add the role of the new control to rolesToAdd
          rolesToAdd = [...rolesToAdd, ...newRoles];
        }
        // if the role was removed
        else if (!newRoles) {
          // add the role of the initial control to rolesToRemove
          rolesToRemove = [...rolesToRemove, ...initRoles];
        }
        // if the role was changed
        else if (!newRoles[0].pk_entity) {
          // add the role of the initial control to the roles to remove
          rolesToRemove = [...rolesToRemove, ...initRoles];

          // add the role of the new control to the roles to add
          rolesToAdd = [...rolesToAdd, ...newRoles];
        }
        // if the role was unchanged
        else if (newRoles[0].pk_entity) {
          // add the role to the unchanged roles
          unchangedRoles = [...unchangedRoles, ...newRoles]
        }

      })

      // change the epr of the roles to add
      rolesToAdd.forEach(r => {
        // no need to creat a new epr, since the roles to add come with one that contains calendar info
        r.entity_version_project_rels[0].is_in_project = true;
      });

      // change the epr of the roles to remove
      rolesToRemove.forEach(r => {
        r.entity_version_project_rels = [new InfEntityProjectRel({ is_in_project: false } as InfEntityProjectRel)];
      });

      // create a InfTemporalEntity to send to the api
      const teEnt = new InfTemporalEntity({
        ...this.parentTeEntStore.getState().teEnt,
        te_roles: [
          ...rolesToRemove, // first all roles are removed from project 
          ...rolesToAdd // than all roles are created or added to project
        ]
      } as InfTemporalEntity)

      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(
        this.ngRedux.getState().activeProject.pk_project, teEnt
      ).subscribe(teEnts => {
        const roles = [
          // get the resulting roles of the and filter out the ones that are in project
          ...teEnts[0].te_roles.filter(role => (role.entity_version_project_rels && role.entity_version_project_rels[0].is_in_project)),
          // concat with the roles that were unchanged
          ...unchangedRoles
        ];

        // update the state
        this.stateCreator.initializeExistenceTimeState(roles, { toggle: 'expanded' }).subscribe(existTimeDetail => {
          this.submitted.emit(existTimeDetail)
        })
      }))
    }
    else {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          this.formGroup.get(key).markAsTouched()
        }
      })
    }
  }
}


