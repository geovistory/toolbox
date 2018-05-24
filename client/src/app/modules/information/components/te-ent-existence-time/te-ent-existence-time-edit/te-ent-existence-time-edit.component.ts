import { Component, OnInit, ChangeDetectionStrategy, forwardRef, AfterViewInit } from '@angular/core';
import { TeEntExistenceTimeComponent, TeEntExistenceTimeSubStore } from '../te-ent-existence-time.component';
import { EntityEditorService, InfTemporalEntityApi, Project, InfRole, InfTemporalEntity, InfTimePrimitive, InfEntityProjectRel } from 'app/core';
import { TeEntService } from '../../../shared/te-ent.service';
import { IExistenceTimeState } from '../te-ent-existence-time.model';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { ExistenceTimeActions } from '../te-ent-existence-time.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { DfhConfig } from '../../../shared/dfh-config';
import { FormBuilder, NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators } from '@angular/forms';
import { slideInOut } from '../../../shared/animations';
import { ITeEntState } from '../../te-ent/te-ent.model';
import { RoleSetState, IRoleSetState, IRoleStates } from '../../role-set/role-set.model';
import { roleSetKey } from '../../role-set-list/role-set-list-actions';
import { union } from 'ramda';

@WithSubStore(TeEntExistenceTimeSubStore)
@Component({
  selector: 'gv-te-ent-existence-time-edit',
  templateUrl: './te-ent-existence-time-edit.component.html',
  styleUrls: ['./te-ent-existence-time-edit.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntExistenceTimeEditComponent),
      multi: true
    }
  ]
})
export class TeEntExistenceTimeEditComponent extends TeEntExistenceTimeComponent implements AfterViewInit {

  projectPk: number;
  formGroup: FormGroup;

  parentTeEntState: ITeEntState; // needed for creating a value to send to api

  // roles given on Init. Need to be removed from project, if edited
  changedRoles: {
    [key: string]: {
      role: InfRole[];
      changes: number;
    }
  }

  initialFormVal;

  constructor(
    public entityEditor: EntityEditorService,
    protected teEntService: TeEntService,
    protected ngRedux: NgRedux<IExistenceTimeState>,
    protected actions: ExistenceTimeActions,
    protected stateCreator: StateCreatorService,
    protected teEntApi: InfTemporalEntityApi,
    protected fb: FormBuilder
  ) {
    super(entityEditor, teEntService, ngRedux, actions, stateCreator)

    this.initForm();

    this.initFormSubscription();

  }

  /**
   * Inits the formGroup used in template
   */
  initForm() {
    this.formGroup = this.fb.group({});
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

  /**
   * called by base class during ngOnInit 
   */
  initTeEntExistenceTimeChildren() {

    // Subscribe to the parentTeEntState, needed to create a InfTemporalEntity object to send to api
    this.subs.push(this.ngRedux.select<ITeEntState>(this.parentTeEntStatePath).subscribe(d => {
      if (d) {
        this.parentTeEntState = d;
      }
    }))

    // Subscribe to the activeProject, to get the pk_project needed for api call
    this.subs.push(this.ngRedux.select<Project>(['activeProject']).subscribe(d => {
      if (d) this.projectPk = d.pk_project;
    }))

    this.initFormCtrls()
  }


  /**
   * Takes the given role sets and adds a form control for each of them.
   * Called by this class during ngOninit.
  */
  initFormCtrls() {

    const rs = this.existenceTimeState.roleSets;

    // iterate over roleSets of the existence time state
    if (rs)
      Object.keys(rs).forEach(key => {
        if (rs[key]) {
          const roleStates: IRoleStates = rs[key].roleStatesInProject;

          const ctrl = new FormControl(null, [Validators.required]);

          this.formGroup.addControl(key, ctrl)

        }
      })
  }

  ngAfterViewInit() {
    this.initialFormVal = this.formGroup.value;
  }


  /**
  * called, when user selected a the kind of property leading to TimePrimitive to add
  */
  addRoleSet(key: number) {
    // find the ingoing roleSet to add
    const roleSetTemplate = new RoleSetState({
      ...this.existenceTimeState.ingoingRoleSets.find(rs => rs.property.dfh_pk_property == key),
      state: 'create-pe-it-role',
      toggle: 'expanded'
    })

    const role = new InfRole();
    role.time_primitive = new InfTimePrimitive();
    role.time_primitive.fk_class = DfhConfig.CLASS_PK_TIME_PRIMITIVE;
    role.fk_property = roleSetTemplate.property.dfh_pk_property

    // update the state
    this.stateCreator.initializeRoleSetState([role], roleSetTemplate).subscribe(roleSetState => {
      this.localStore.dispatch(this.actions.addRoleSet({ [roleSetKey(roleSetState)]: roleSetState }))
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

  }

  /**
  * called, when user removes a property leading to TimePrimitive
  */
  removeRoleSet(key: string) {

    // update the state
    this.localStore.dispatch(this.actions.removeRoleSet(key))

    // remove the form control
    this.formGroup.removeControl(key)

  }



  /**
   * called, when user stops the editing of the existence time
   */
  stopEditing() {
    const options: IExistenceTimeState = { toggle: 'expanded' }
    this.stateCreator.initializeExistenceTimeState(this.existenceTimeState.roles, 'editable', options).subscribe(existTimeState => {
      this.localStore.dispatch(this.actions.stopEditing(existTimeState));
    })
  }



  // setExistenceTime(teEnt: InfTemporalEntity) {
  //   this.subs.push(this.teEntService.buildExistenceTime(teEnt).subscribe((existenceTime: ExistenceTime) => {
  //     this.existenceTime = existenceTime;
  //   }));
  // }

  /**
   * Called when a user submits a new existence time
   */
  onSubmitExistenceTime() {

    if (this.formGroup.valid) {
      const newVal = this.formGroup.value;
      const initVal = this.initialFormVal;

      const keys = union(Object.keys(newVal), Object.keys(initVal))

      let rolesToAdd: InfRole[] = []
      let rolesToRemove: InfRole[] = []
      let unchangedRoles: InfRole[] = []


      // make all roles to add and all roles to remove
      keys.forEach(key => {
        const newCtrl: InfRole[] = newVal[key], initCtrl: InfRole[] = initVal[key];

        // if the control was added
        if (!initCtrl) {
          // add the role of the new control to rolesToAdd
          rolesToAdd = [...rolesToAdd, ...newCtrl];
        }
        // if the role was removed
        else if (!newCtrl) {
          // add the role of the initial control to rolesToRemove
          rolesToRemove = [...rolesToRemove, ...initCtrl];
        }
        // if the role was changed
        else if (!newCtrl[0].pk_entity) {
          // add the role of the initial control to the roles to remove
          rolesToRemove = [...rolesToRemove, ...initCtrl];

          // add the role of the new control to the roles to add
          rolesToAdd = [...rolesToAdd, ...newCtrl];
        }
        // if the role was unchanged
        else if (newCtrl[0].pk_entity) {
          // add the role to the unchanged roles
          unchangedRoles = [...unchangedRoles, ...newCtrl]
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
        ...this.parentTeEntState.teEnt,
        te_roles: [
          ...rolesToRemove, // first all roles are removed from project 
          ...rolesToAdd // than all roles are created or added to project
        ]
      } as InfTemporalEntity)

      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.projectPk, teEnt).subscribe(teEnts => {
        const roles = [
          // get the resulting roles of the and filter out the ones that are in project
          ...teEnts[0].te_roles.filter(role => (role.entity_version_project_rels && role.entity_version_project_rels[0].is_in_project)),
          // concat with the roles that were unchanged
          ...unchangedRoles
        ];

        // update the state
        this.stateCreator.initializeExistenceTimeState(roles, 'editable', { toggle: 'expanded' }).subscribe(existTimeState => {
          this.localStore.dispatch(this.actions.existenceTimeUpdated(existTimeState));
        })
      }))
    }
  }


}