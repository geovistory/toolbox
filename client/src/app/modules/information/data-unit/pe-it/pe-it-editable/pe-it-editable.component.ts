import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComConfig, IAppState, U, UiContext } from 'app/core';
import { PeItDetail, AddOption, RoleSet, CollapsedExpanded, RoleSetForm, ExistenceTimeDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { Observable } from 'rxjs';
import { slideInOut } from '../../../shared/animations';
import { DataUnitAPIEpics } from '../../data-unit.epics';
import { PeItApiEpics } from '../api/pe-it.epics';
import { PeItBase } from '../pe-it-base';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';
import { createExistenceTimeDetail } from 'app/core/state/services/state-creator';



@WithSubStore({
  localReducer: peItReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-editable',
  templateUrl: './pe-it-editable.component.html',
  styleUrls: ['./pe-it-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PeItEditableComponent extends PeItBase implements AfterViewInit {

  afterViewInit = false;


  localStore: ObservableStore<PeItDetail>;

  /**
   * Local Store Observables
   */
  // Primary key of the peIt
  @select() pkEntity$: Observable<number>;
  @select() ontoInfoVisible$: Observable<boolean>
  @select() communityStatsVisible$: Observable<boolean>

  uiContext: UiContext;

  pkEntity: number;

  /**
   * Class properties that filled by a store observable
   */
  peItState: PeItDetail;

  // if this variable is set, only that child is shown, all other elements are hidden
  isolatedChild: string;

  initStore(): void {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItReducer);
  }

  constructor(
    protected rootEpics: RootEpics,
    protected epics: PeItApiEpics,
    protected ngRedux: NgRedux<IAppState>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected dataUnitEpics: DataUnitAPIEpics
  ) {
    super(rootEpics, dataUnitEpics, epics, ngRedux, actions, fb);
    console.log('PeItEditableComponent')
  }

  initPeItBaseChild() {

    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE];

    this.initPeItSubscriptions()

  }


  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initPeItSubscriptions() {
    this.localStore.select<PeItDetail>('').takeUntil(this.destroy$).subscribe(d => {
      this.peItState = d;
      this.isolatedChild = U.extractDataUnitChildKeyForIsolation(d._children);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.afterViewInit = true;
    }, 2000)
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

          const existenceTimeDetail = createExistenceTimeDetail(
            new ExistenceTimeDetail({ toggle: 'expanded' }),
            [],
            this.ngRedux.getState().activeProject.crm,
            { pkUiContext: ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE }
          )
          this.addPropSet('_existenceTime', existenceTimeDetail)

        }

      }

    }

  }


  /**
  * Show ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  showCommunityStats() {
    this.localStore.dispatch(this.actions.communityStatsVisibilityToggled(true))
  }

  /**
  * Hide ui with community statistics like
  * - is in project count
  * - is standard in project count
  */
  hideCommunityStats() {
    this.localStore.dispatch(this.actions.communityStatsVisibilityToggled(false))
  }


  /**
  * Show CRM Info in UI
  */
  showOntoInfo() {
    this.localStore.dispatch(this.actions.ontoInfoVisibilityToggled(true))
  }

  /**
  * Hide CRM Info in UI
  */
  hideOntoInfo() {
    this.localStore.dispatch(this.actions.ontoInfoVisibilityToggled(false))
  }

  /**
  * Show right panel
  */
  showRightPanel() {
    this.localStore.dispatch(this.actions.showRightPanel())
  }


  /**
  * Hide right panel
  */
  hideRightPanel() {
    this.localStore.dispatch(this.actions.hideRightPanel())
  }
}
