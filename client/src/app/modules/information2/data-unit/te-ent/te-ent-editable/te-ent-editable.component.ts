import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComConfig, UiContext } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs/Observable';

import { ExistenceTimeDetail, RoleDetail, TeEntDetail } from '../../../information.models';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import { slideInOut } from '../../../shared/animations';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { DataUnitBase } from '../../data-unit.base';
import { TeEntActions } from '../te-ent.actions';
import { teEntReducer } from '../te-ent.reducer';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: teEntReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-te-ent-editable',
  templateUrl: './te-ent-editable.component.html',
  styleUrls: ['./te-ent-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeEntEditableComponent extends DataUnitBase {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, '_teEnt']
  basePath: string[];
  localStore: ObservableStore<TeEntDetail>;

  @select() toggle$: Observable<boolean>
  @select() _existenceTime$: Observable<ExistenceTimeDetail>;
  @select() _existenceTime_edit$: Observable<ExistenceTimeDetail>;

  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];

  /**
   * Other Store Observables
   */
  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>


  /**
   * Class properties that filled by a store observable
   */
  parentRoleState: RoleDetail;
  teEnState: TeEntDetail;

  uiContext: UiContext;



  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
  ) {
    super(ngRedux, fb, stateCreator);
  }

  /**
   * Methods
   */
  // gets called by base class onInit
  initStore() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), teEntReducer);
  }


  // gets called by base class onInit
  init() {

    this.initPaths()

    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

    this.initObservablesOutsideLocalStore();

    this.initTeEntSubscriptions();


  }

  /**
* init paths to different slices of the store
*/
  initPaths() {
    // transforms e.g.  ['information', 'entityEditor', 'peItState', 'roleSets', '1', '_role_list', '79060']
    // to               ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 4));

  }

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
  initTeEntSubscriptions() {

    this.ngRedux.select<RoleDetail>(this.parentPath).subscribe(d => this.parentRoleState = d)

    this.subs.push(this.localStore.select<TeEntDetail>('').subscribe(d => {
      this.teEnState = d
    }))


    // /**
    // * gets the Appellation is for given teEnt roleSets that is for display in this project
    // */
    // this.subs.push(this.localStore.select<RoleSetList>(['_children']).subscribe((_children) => {
    //   this.label = U.labelFromDataUnitChildList(_children);
    //   const oldLabel = (this.teEnState && this.teEnState.label) ? this.teEnState.label : undefined;

    //   // update store
    //   if (this.teEnState && oldLabel !== this.label)
    //     this.localStore.dispatch(this.actions.roleSetsListDisplayLabelUpdated(this.label))

    // }))

  }


  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }

}
