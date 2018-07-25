import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComConfig, IAppState, UiContext } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs/Observable';

import { PeItDetail } from '../../../information.models';
import { slideInOut } from '../../../shared/animations';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { DataUnitBase } from '../../data-unit.base';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';


@AutoUnsubscribe()
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
export class PeItEditableComponent extends DataUnitBase {

  @Input() basePath: string[];
  getBasePath = () => this.basePath;

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

  initStore(): void {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItReducer);
  }

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
  ) {
    super(ngRedux, fb, stateCreator);
    console.log('PeItEditableComponent')

  }

  init() {
    this.basePath = this.getBasePath();

    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

    this.initPeItSubscriptions()

  }


  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initPeItSubscriptions() {
    this.subs.push(this.localStore.select<PeItDetail>('').subscribe(d => {
      this.peItState = d
    }))

    // /**
    // * gets the Appellation is for given peIt roleSets that is for display in this project
    // */
    // this.subs.push(this.localStore.select<RoleSetList>(['_children']).subscribe((_children) => {
    //   this.label = U.labelFromDataUnitChildList(_children);
    //   const oldLabel = (this.peItState && this.peItState.label) ? this.peItState.label : undefined;

    //   // update store
    //   if (this.peItState && oldLabel !== this.label)
    //     this.localStore.dispatch(this.actions.roleSetsListDisplayLabelUpdated(this.label))

    // }))
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

}
