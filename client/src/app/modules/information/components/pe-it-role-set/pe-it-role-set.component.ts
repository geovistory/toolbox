import {
  Component, OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';

import { TeEntComponent } from '../te-ent/te-ent.component';
import { RoleSetComponent } from '../role-set/role-set.component';
import { PeItRoleComponent } from '../pe-it-role/pe-it-role.component';
import { InfPersistentItem, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService, InfRole, DfhProperty, Project } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { WithSubStore, ObservableStore, NgRedux, select } from '@angular-redux/store';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { roleSetReducer } from '../role-set/role-set.reducer';
import { IRoleSetState } from '../role-set/role-set.model';
import { RoleSetActions } from '../role-set/role-set.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { peItReducer } from '../../containers/pe-it/pe-it.reducer';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { RoleSetService } from '../../shared/role-set.service';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: roleSetReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-role-set',
  templateUrl: './pe-it-role-set.component.html',
  styleUrls: ['./pe-it-role-set.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
        style({
          height: '*',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '0px',
          display: 'hidden',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          offset: 1
        })
      ])))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PeItRoleSetComponent extends RoleSetComponent {

  // Array of children RoleComponents
  @ViewChildren(PeItRoleComponent) roleComponents: QueryList<PeItRoleComponent>


  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];


  /**
   * Stores to other slices of the store
   */
  // parentPeItStore:ObservableStore<IPeItState>

  /**
   * Other store Observables
   */

  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>


  // needed on this. scope for user interactions where we can't add subcriptions on each click
  property: DfhProperty;
  parentPeIt: InfPersistentItem;
  fkProject: number

  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    ngRedux: NgRedux<IRoleSetState>,
    actions: RoleSetActions,
    private peItRedux: NgRedux<IPeItState>,
    private peItActions: PeItActions,
    roleSetService:RoleSetService
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector, ngRedux, actions, roleSetService)

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
    this.property$.subscribe(p => this.property = p)
    this.ngRedux.select<InfPersistentItem>([...this.parentPeItStatePath, 'peItToEdit']).subscribe(i => this.parentPeIt = i)
    this.ngRedux.select<Project>('activeProject').subscribe(p => this.fkProject = p.pk_project)
  }

  /**
  * Called when user click on Add a [*]
  */
  startAddingRole() {

    // this.rolesInNoProjectVisible = false;

    // this.addRoleState = 'selectExisting'

    // this.rolesNotInProjectLoading = true;

    // const fkProperty = this.property.dfh_pk_property;
    // const fkEntity = this.parentPeIt.pk_entity;
    // const fkProject = this.fkProject;

    // const waitAtLeast = timer(800);
    // const apiCall = this.roleApi.alternativesNotInProjectByEntityPk(fkEntity, fkProperty, fkProject)

    // Observable.combineLatest([waitAtLeast, apiCall])
    //   .subscribe((results) => {

    //     this.rolesNotInProjectLoading = false;

    //     this.rolesInOtherProjects = results[1]
    //       .filter(role => role.is_in_project_count > 0);

    //     this.rolesInNoProject = results[1]
    //       .filter(role => role.is_in_project_count == 0);

    //     if (results[1].length === 0) {
    //       this.startCreateNewRole();
    //     }

    //   })


  }

  /**
  * Called when user clicks on create new
  * Creates a new InfRole of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    // this.propStateChange.emit('createRole');

    //   this.roleToCreate = new InfRole();
    //   this.roleToCreate.fk_property = this.fkProperty;
    //   this.roleToCreate.fk_entity = this.parentEntityPk;

    //   this.addRoleState = 'createNew';
    // }

    // get removeSectionBtnVisible() {
    //   if (this.roles && (this.roles.length === 0)) return true;

    //   return false;
  }

}
