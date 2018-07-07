import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataUnitBase } from '../../data-unit.base';
import { ObservableStore, NgRedux, WithSubStore, select } from '@angular-redux/store';
import { TeEntDetail, RoleDetail, RoleSetList, RoleSet, ExistenceTimeDetail } from '../../../information.models';
import { Observable } from 'rxjs/Observable';
import { TeEntActions } from '../te-ent.actions';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { teEntReducer } from '../te-ent.reducer';
import { StateToDataService } from '../../../shared/state-to-data.service';
import { roleSetKey } from '../../../information.helpers';
import { slideInOut } from '../../../shared/animations';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { UiContext, ComConfig } from 'app/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs/operators';


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

  comConfig = ComConfig;


  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb);
  }

  /**
   * Methods
   */
  // gets called by base class onInit
  initStore() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), teEntReducer);
    this.basePath = this.getBasePath();
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
    // transforms e.g. ['information', 'entityEditor', 'peItState', 'roleSets', '1', 'roleStatesInProject', '79060']
    // to ['information', 'entityEditor', 'peItState']
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


    /**
    * gets the Appellation is for given teEnt roleSets that is for display in this project
    */
    this.subs.push(this.localStore.select<RoleSetList>(['_roleSet_list']).subscribe((teEntRoleSets) => {
      this.label = StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(teEntRoleSets);
      const oldLabel = (this.teEnState && this.teEnState.label) ? this.teEnState.label : undefined;

      // update store
      if (this.teEnState && oldLabel !== this.label)
        this.localStore.dispatch(this.actions.roleSetsListDisplayLabelUpdated(this.label))

    }))

  }


  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }



  /**
   * Typeahead. 
   * TODO: extract to component 
   */

  model: any;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();



  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
}


export const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];