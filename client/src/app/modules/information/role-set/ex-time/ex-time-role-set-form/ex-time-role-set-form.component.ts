import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { RoleDetail, TeEntDetail, StateSettings } from 'app/core/state/models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { combineLatest, timer } from 'rxjs';
import { teEntReducer } from '../../../data-unit/te-ent/te-ent.reducer';
import { ClassService } from '../../../shared/class.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetFormBase } from '../../role-set-form.base';
import { RoleSetActions } from '../../role-set.actions';
import { roleSetReducer } from '../../role-set.reducer';



@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-ex-time-role-set-form',
  templateUrl: './ex-time-role-set-form.component.html',
  styleUrls: ['./ex-time-role-set-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExTimeRoleSetFormComponent),
      multi: true
    }
  ]
})
export class ExTimeRoleSetFormComponent extends RoleSetFormBase implements ControlValueAccessor {


  @Input() parentTeEntPath: string[];

  @Output() touched: EventEmitter<void> = new EventEmitter();

  parentTeEntStore: ObservableStore<TeEntDetail>;

  roles: InfRole[]; // value set on writeValue


  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected actions: RoleSetActions,
    protected roleApi: InfRoleApi,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    private teEntApi: InfTemporalEntityApi

  ) {
    super(fb, ngRedux, ref, actions)

  }

  submit() {
    // (click)="createRoles()"
  }

  initRoleSetFormBaseChild(): void {
    this.parentTeEntStore = this.ngRedux.configureSubStore(this.parentTeEntPath, teEntReducer)

    this.loadAlternativeRoles()
  }


  loadAlternativeRoles() {

    const s = this.localStore.getState();
    const ps = this.parentTeEntStore.getState();

    const fkProperty = s.property.dfh_pk_property;
    const fkTemporalEntity = ps.teEnt.pk_entity;
    const fkProject = this.ngRedux.getState().activeProject.pk_project;

    const waitAtLeast = timer(0);
    const apiCall = this.roleApi.alternativesNotInProjectByTeEntPk(fkTemporalEntity, fkProperty, fkProject)

    this.subs.push(combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => parseInt(role.is_in_project_count) > 0);
        const rolesInNoProject = results[1].filter(role => parseInt(role.is_in_project_count) == 0);

        const inOther$ = this.stateCreator.initializeRoleDetails(rolesInOtherProjects, { isOutgoing: s.isOutgoing })
        const inNo$ = this.stateCreator.initializeRoleDetails(rolesInNoProject, { isOutgoing: s.isOutgoing })

        combineLatest(inOther$, inNo$).subscribe(results => {
          const roleStatesInOtherProjects = results[0], roleStatesInNoProjects = results[1]

          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleStatesInOtherProjects,
            roleStatesInNoProjects
          ))


          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          } else {
            this.initAddFormCtrls(roleStatesInOtherProjects)
          }

        })
      }))

  }


  /**
  * Called when user clicks on create new or when loading alternative roles returned 0 alt. roles
  * Creates a new RoleDetail of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {

    const s = this.localStore.getState();
    const ps = this.parentTeEntStore.getState();


    const roleToCreate = {
      fk_property: s.property.dfh_pk_property,
      fk_temporal_entity: ps.teEnt.pk_entity,
    } as InfRole;

    const options: RoleDetail = { targetClassPk: s.targetClassPk, isOutgoing: s.isOutgoing }
    const settings: StateSettings = { isCreateMode: true }

    // initialize the state
    this.subs.push(this.stateCreator.initializeRoleDetail(roleToCreate, options, settings).subscribe(roleStateToCreate => {
      this.initCreateFormCtrls(roleStateToCreate)
    }))

  }


  createRoles() {
    const s = this.localStore.getState();

    if (this.createForm.valid) {

      // prepare teEnt 
      const t = new InfTemporalEntity(this.parentTeEntStore.getState().teEnt);
      t.te_roles = [];

      Object.keys(this.createForm.controls).forEach(key => {
        if (this.createForm.get(key)) {
          // add roles to create to peIt
          t.te_roles.push(this.createForm.get(key).value)
        }
      })

      // call api
      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.ngRedux.getState().activeProject.pk_project, t).subscribe(teEnts => {
        const roles: InfRole[] = teEnts[0].te_roles;


        // update the form group
        Object.keys(this.createForm.controls).forEach(key => {
          this.createForm.removeControl(key)
        })

        // update the state
        this.subs.push(this.stateCreator.initializeRoleDetails(roles, { isOutgoing: s.isOutgoing }).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
    }
  }

  addRoles() {
    const s = this.localStore.getState();

    if (this.addForm.valid) {

      // prepare teEnt 
      const p = new InfTemporalEntity(this.parentTeEntStore.getState().teEnt);
      p.te_roles = [];

      Object.keys(this.addForm.controls).forEach(key => {
        if (this.addForm.get(key)) {
          // add roles to create to teEnt
          p.te_roles.push(this.addForm.get(key).value)
        }
      })

      // call api
      this.subs.push(this.teEntApi.changeTeEntProjectRelation(this.ngRedux.getState().activeProject.pk_project, true, p).subscribe(teEnt => {
        const roles: InfRole[] = teEnt[0].te_roles;

        // update the form group
        Object.keys(this.addForm.controls).forEach(key => {
          this.addForm.removeControl(key)
        })


        // update the state
        this.subs.push(this.stateCreator.initializeRoleDetails(roles, { isOutgoing: s.isOutgoing }).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
    }
  }

  /**
  *  called when user cancels to create new roles
  *
  */
  cancelCreateRoles() {

    /** remove the RoleState from state */
    this.localStore.dispatch(this.actions.stopCreateNewRole());

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

      if (this.createForm.valid) {
        this.onChange(val)
      } else {
        this.onChange(null)
      }
    }))
  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {
    this.roles = roles ? roles : [new InfRole()];
  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.initFormSubscription()
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (role: InfRole | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }
}
