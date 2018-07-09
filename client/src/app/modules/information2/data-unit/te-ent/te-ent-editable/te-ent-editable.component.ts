import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataUnitBase } from '../../data-unit.base';
import { ObservableStore, NgRedux, WithSubStore, select } from '@angular-redux/store';
import { TeEntDetail, RoleDetail, RoleSetList, RoleSet, ExistenceTimeDetail, AddOption } from '../../../information.models';
import { Observable } from 'rxjs/Observable';
import { TeEntActions } from '../te-ent.actions';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { teEntReducer } from '../te-ent.reducer';
import { StateToDataService } from '../../../shared/state-to-data.service';
import { roleSetKey, roleSetKeyFromParams } from '../../../information.helpers';
import { slideInOut } from '../../../shared/animations';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { UiContext, ComConfig, UiElement } from 'app/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, merge, map, combineLatest } from 'rxjs/operators';
import { Widget } from '../../../../admin/admin.models';
import { StateCreatorService } from '../../../shared/state-creator.service';


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

  addOptions: AddOption[];
  selectedAddOption: AddOption;

  comConfig = ComConfig;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: TeEntActions,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
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

    this.addOptions = this.uiContext.uiElements.map(el => {
      if (el.fk_property) {
        const roleSet = this.classConfig.roleSets[roleSetKeyFromParams(el.fk_property, el.property_is_outgoing)]
        return {
          label: roleSet.label.default,
          uiElement: el
        }
      }
      else if (el.fk_property_set) {
        return {
          label: el.property_set.label,
          uiElement: el
        }
      }
    })

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

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  typeaheadWitdh: number;

  search = (text$: Observable<string>) => {

    this.selectedAddOption = undefined;

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    // filter options not yet added
    const options = this.addOptions.filter(o => (this.addOptionAdded(o) == false))

    return Observable.merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).map((term) =>
      (term === '' ? options : options
        .filter(o => (
          o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
        ))
      ).slice(0, 10)
    )
  }



  addOptionSelected($event) {
    const o: AddOption = $event.item;

    if (o.uiElement.roleSetKey) {
      this.addRoleSet(this.classConfig.roleSets[o.uiElement.roleSetKey])
    }

    else if (o.uiElement.fk_property_set) {

      if (o.uiElement.fk_property_set === ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

        this.stateCreator.initializeExistenceTimeState([], { toggle: 'expanded' }).subscribe(val => {
          this.addPropSet('_existenceTime', val)
        })

      }

    }

  }

}
