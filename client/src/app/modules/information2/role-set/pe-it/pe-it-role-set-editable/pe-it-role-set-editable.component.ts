import { NgRedux } from '@angular-redux/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InfEntityProjectRelApi, InfRoleApi, DfhProperty, InfPersistentItem, Project, IAppState, InfRole, InfTemporalEntity, InfPersistentItemApi } from 'app/core';

import { RoleDetail, RoleSet, PeItDetail, RoleDetailList } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetBase } from '../../role-set.base';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { slideInOut } from '../../../shared/animations';

@Component({
  selector: 'gv-pe-it-role-set-editable',
  templateUrl: './pe-it-role-set-editable.component.html',
  styleUrls: ['./pe-it-role-set-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeItRoleSetEditableComponent extends RoleSetBase {


  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];


  /**
   * Stores to other slices of the store
   */
  // parentPeItStore:ObservableStore<PeItDetail>

  /**
   * Other store Observables
   */

  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>


  // needed on this. scope for user interactions where we can't add subcriptions on each click
  property: DfhProperty;
  parentPeIt: InfPersistentItem;
  fkProject: number
  parentPeItState: PeItDetail;

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
    protected fb: FormBuilder,
    private peItApi: InfPersistentItemApi
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


  init() {

    this.initPaths()

    // this.initStores()

    this.initObservablesOutsideLocalStore();

    this.initSubsciptions();

  }

  /**
   * init paths to different slices of the store
   */
  initPaths() {
    this.parentPeItStatePath = this.parentPath;
  }

  /**
 * init stores to different slices of the store
 */
  // initStores() {
  // this.parentPeItStore = this.peItRedux.configureSubStore(this.parentPeItStatePath, peItReducer);
  // }

  /**
   * init observables to other slices of the store than the local store
   * (to select observables from local store, use @select decorator)
   */
  initObservablesOutsideLocalStore() {
    this.ontoInfoVisible$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'ontoInfoVisible']);
  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initSubsciptions() {
    this.subs.push(this.property$.subscribe(p => this.property = p))
    this.subs.push(this.ngRedux.select<InfPersistentItem>([...this.parentPeItStatePath, 'peIt']).subscribe(i => this.parentPeIt = i))
    this.subs.push(this.ngRedux.select<PeItDetail>(this.parentPath).subscribe(d => this.parentPeItState = d))
    this.subs.push(this.ngRedux.select<Project>('activeProject').subscribe(p => this.fkProject = p.pk_project))



  }


  /**
  * Called when user click on Add a [*]
  * 
  * Searches alternative roles.
  * If no alternative roles used by at least one project found, continue creating new role directly.
  */
  startAddingRole() {


    this.localStore.dispatch(this.actions.startAddingRole())

    const fkProperty = this.roleSetState.property.dfh_pk_property;
    const fkEntity = this.parentPeItState.peIt.pk_entity;
    const fkProject = this.ngRedux.getState().activeProject.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByEntityPk(fkEntity, fkProperty, fkProject)

    this.subs.push(Observable.combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => parseInt(role.is_in_project_count) > 0);
        const rolesInNoProject = results[1].filter(role => parseInt(role.is_in_project_count) == 0);

        const inOther$ = this.stateCreator.initializeRoleDetails(rolesInOtherProjects,  this.roleSetState.isOutgoing)
        const inNo$ = this.stateCreator.initializeRoleDetails(rolesInNoProject, this.roleSetState.isOutgoing)

        Observable.combineLatest(inOther$, inNo$).subscribe(results => {
          const roleStatesInOtherProjects = results[0], roleStatesInNoProjects = results[1]

          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleStatesInOtherProjects,
            roleStatesInNoProjects
          ))

          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          }

        })
      }))

  }


  /**
  * Called when user clicks on create new
  * Creates a new RoleDetail of the kind of property of this component
  * and pointing to the parent persistent item
  */


  startCreateNewRole() {


    this.subs.push(this.classService.getByPk(this.roleSetState.targetClassPk).subscribe(targetDfhClass => {

      const roleToCreate = new InfRole();
      roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
      roleToCreate.fk_entity = this.parentPeItState.peIt.pk_entity;

      let teEnt = new InfTemporalEntity;
      teEnt.fk_class = targetDfhClass.dfh_pk_class;
      roleToCreate.temporal_entity = teEnt;

      const options: RoleDetail = {
        targetDfhClass,
        toggle: 'expanded'
      }

      this.subs.push(this.stateCreator.initializeRoleDetail(roleToCreate, this.roleSetState.isOutgoing, options).subscribe(roleStateToCreate => {


        console.log(JSON.stringify(roleStateToCreate))

        /** add a form control */
        const formControlName = 'new_role_' + this.createFormControlCount;
        this.createFormControlCount++;
        this.formGroup.addControl(formControlName, new FormControl(
          roleStateToCreate.role,
          [
            Validators.required
          ]
        ))

        /** update the state */
        const roleDetailList: RoleDetailList = {};
        roleDetailList[formControlName] = roleStateToCreate;
        this.localStore.dispatch(this.actions.startCreateNewRole(roleDetailList))
      }))
    })
    )
  }


  createRoles() {
    if (this.formGroup.valid) {

      // prepare peIt 
      const p = new InfPersistentItem(this.parentPeIt);
      p.pi_roles = [];

      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          // add roles to create to peIt
          p.pi_roles.push(this.formGroup.get(key).value)
        }
      })

      // call api
      this.subs.push(this.peItApi.findOrCreatePeIt(this.project.pk_project, p).subscribe(peIts => {
        const roles: InfRole[] = peIts[0].pi_roles;

        // update the form group
        Object.keys(this.formGroup.controls).forEach(key => {
          this.formGroup.removeControl(key)
        })


        // update the state
        this.subs.push(this.stateCreator.initializeRoleDetails(roles, this.roleSetState.isOutgoing).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
    }
  }
}
