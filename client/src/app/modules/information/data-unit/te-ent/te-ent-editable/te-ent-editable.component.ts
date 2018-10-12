import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComConfig, UiContext } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subject } from 'rxjs';

import { ExistenceTimeDetail, RoleDetail, RoleSet, TeEntDetail, TeEntAccentuation, AddOption, RoleSetForm, CollapsedExpanded } from 'app/core/state/models';
import { slideInOut } from '../../../shared/animations';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { DataUnitBase } from '../../data-unit.base';
import { TeEntActions } from '../te-ent.actions';
import { TeEntAPIEpics } from '../te-ent.epics';
import { teEntReducer } from '../te-ent.reducer';
import { RootEpics } from '../../../../../core/store/epics';
import { DataUnitAPIEpics } from '../../data-unit.epics';


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

  basePath: string[];
  localStore: ObservableStore<TeEntDetail>;

  @select() toggle$: Observable<boolean>
  @select() _existenceTime$: Observable<ExistenceTimeDetail>;
  @select() _existenceTime_edit$: Observable<ExistenceTimeDetail>;
  @select() accentuation$: Observable<TeEntAccentuation>;
  @select() editing$: Observable<boolean>;

  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];

  /**
   * Other Store Observables
   */
  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>
  parentRoleSet$: Observable<RoleSet>

  /**
   * Class properties that filled by a store observable
   */
  parentRoleState: RoleDetail;
  teEnState: TeEntDetail;

  uiContext: UiContext;

  // used for storing previous accentuation when mouse enters
  previousAccentuation: TeEntAccentuation;

  constructor(
    protected rootEpics: RootEpics,
    protected dataUnitEpics: DataUnitAPIEpics,
    protected epics: TeEntAPIEpics,
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
  ) {
    super(ngRedux, fb, stateCreator, rootEpics, dataUnitEpics);
  }

  getBasePath = () => [...this.parentPath, '_teEnt']

  /**
   * Methods
   */
  // gets called by base class onInit
  initStore() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), teEntReducer);

    this.rootEpics.addEpic(this.epics.createEpics(this.localStore, this.basePath, this.destroy$))

  }


  // gets called by base class onInit
  init() {

    this.initPaths()

    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

    this.initObservablesOutsideLocalStore();

    this.initTeEntSubscriptions();

  }

  destroy() {

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

    this.parentRoleSet$ = this.ngRedux.select<RoleSet>(this.parentPath.slice(0, (this.parentPath.length - 2)));

  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initTeEntSubscriptions() {

    this.ngRedux.select<RoleDetail>(this.parentPath).takeUntil(this.destroy$).subscribe(d => this.parentRoleState = d)

    this.localStore.select<TeEntDetail>('').takeUntil(this.destroy$).subscribe(d => {
      this.teEnState = d
    })

  }


  addOptionSelected($event) {

    const o: AddOption = $event.item;

    // if this option is already added
    if (o.added) {

      this.stopSelectProperty();

    } else {

      if (o.uiElement.roleSetKey) {

        // if this is a role set

        // prepare the RoleSet

        const newRoleSet = {
          ...new RoleSet(this.classConfig.roleSets[o.uiElement.roleSetKey]),
          toggle: 'expanded' as CollapsedExpanded,
          rolesNotInProjectLoading: true,
          roleStatesInOtherProjectsVisible: false,
          _role_set_form: new RoleSetForm()
        }

        this.addRoleSet(newRoleSet, undefined)

      } else if (o.uiElement.fk_property_set) {

        // if this is a prop set

        if (o.uiElement.fk_property_set === ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

          this.stateCreator.initializeExistenceTimeState([], new ExistenceTimeDetail({ toggle: 'expanded' }), { isCreateMode: true }).subscribe(val => {
            this.addPropSet('_existenceTime', val)
          })

        }

      }

    }

  }



  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }

  click() {
    if (this.localStore.getState().accentuation !== 'selected') {
      this.localStore.dispatch(this.actions.setAccentuation('selected'))
    } else {
      this.localStore.dispatch(this.actions.setAccentuation('highlighted'))
    }
  }


  mouseenter() {
    if (this.localStore.getState().accentuation !== 'selected') {
      this.localStore.dispatch(this.actions.setAccentuation('highlighted'))
    }
  }

  mouseleave() {
    if (this.localStore.getState().accentuation === 'highlighted') {
      this.localStore.dispatch(this.actions.setAccentuation('none'))
    }
  }

  startEditing() {
    this.localStore.dispatch(this.actions.startEditing())
  }

  stopEditing() {
    this.localStore.dispatch(this.actions.stopEditing())
  }
}
