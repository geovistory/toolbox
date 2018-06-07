import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PeItDetail, RoleSet } from '../../../information.models';
import { DataUnitBase } from '../../data-unit.base';
import { PeItActions } from '../pe-it.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { peItReducer } from '../pe-it.reducer';
import { slideInOut } from '../../../shared/animations';

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


  pkEntity: number;

  /**
   * Class properties that filled by a store observable
   */
  label: string;
  peItState: PeItDetail;

  initStore(): void {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItReducer);
  }

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder
  ) {
    super(fb)
  }

  init() {
    this.basePath = this.getBasePath();

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
  * called, when user selected a the kind of property to add
  */
  addRoleSet(propertyToAdd: RoleSet) {


    // add a role set
    const newRoleSet: RoleSet = {
      ...propertyToAdd,
      toggle: 'expanded',
      roles: []
    }

    this.localStore.dispatch(this.actions.addRoleSet(newRoleSet))

  }

}
