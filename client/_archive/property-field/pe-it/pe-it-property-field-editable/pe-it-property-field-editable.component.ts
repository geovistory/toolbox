import { NgRedux } from '@angular-redux/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DfhProperty, IAppState, ProInfoProjRelApi, InfPersistentItem, InfRoleApi, ProProject, U } from 'app/core';

import { Observable } from 'rxjs';

import { PeItDetail, RoleDetail, RoleDetailList } from 'app/core/state/models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { PropertyFieldService } from '../../../shared/property-field.service';
import { PropertyFieldActions } from '../../property-field.actions';
import { PropertyFieldBase } from '../../property-field.base';
import { PropertyFieldApiEpics } from '../../property-field.epics';
import { RootEpics } from 'app/core/store/epics';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';




@Component({
  selector: 'gv-pe-it-property-field-editable',
  templateUrl: './pe-it-property-field-editable.component.html',
  styleUrls: ['./pe-it-property-field-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeItPropertyFieldEditableComponent extends PropertyFieldBase {

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

  showOntoInfo$: Observable<boolean>
  showCommunityStats$: Observable<boolean>


  // needed on this. scope for user interactions where we can't add subcriptions on each click
  property: DfhProperty;
  parentPeIt: InfPersistentItem;
  fkProject: number
  parentPeItState: PeItDetail;

  // if a roleDetailKey is set, all other elements are hidden
  isolateRoleDetail: string;

  constructor(
    protected rootEpics: RootEpics,
    protected epics: PropertyFieldApiEpics,
    protected eprApi: ProInfoProjRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PropertyFieldActions,
    protected propertyFieldService: PropertyFieldService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder,
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)

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
    this.showOntoInfo$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'showOntoInfo']);
  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initSubsciptions() {
    this.subs.push(this.property$.subscribe(p => this.property = p))
    this.subs.push(this.ngRedux.select<InfPersistentItem>([...this.parentPeItStatePath, 'peIt']).subscribe(i => this.parentPeIt = i))
    this.subs.push(this.ngRedux.select<PeItDetail>(this.parentPath).subscribe(d => this.parentPeItState = d))
    this.subs.push(this.ngRedux.select<ProProject>('activeProject').subscribe(p => this.fkProject = p.pk_entity))

    // observe if a teEnt is in edit mode
    this.subs.push(this._role_list$.subscribe(roleDetails => {

      // extract the roleDetail key of the roleDetail that contains a teEnt in editing = true
      this.isolateRoleDetail = U.extractRoleDetailKeyOfEditingTeEnt(roleDetails);

    }))


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
