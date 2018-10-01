import { NgRedux } from '@angular-redux/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DfhProperty, IAppState, InfEntityProjectRelApi, InfPersistentItem, InfRoleApi, Project } from 'app/core';

import { Observable } from 'rxjs';

import { PeItDetail, RoleDetail } from 'app/core/state/models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetBase } from '../../role-set.base';
import { RoleSetApiEpics } from '../../role-set.epics';
import { RootEpics } from 'app/core/store/epics';




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
    protected rootEpics: RootEpics,
    protected epics: RoleSetApiEpics,
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
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


  test() {
    this.localStore.dispatch({ type: 'TEST' })
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


  }

  enableDrag() {
    if (!this.localStore.getState().dragEnabled) this.localStore.dispatch(this.actions.enableDrag())
  }

}
