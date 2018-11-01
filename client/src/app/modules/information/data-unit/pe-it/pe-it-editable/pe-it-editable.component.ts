import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComConfig, IAppState, U, UiContext } from 'app/core';
import { AddOption, CollapsedExpanded, ExistenceTimeDetail, PeItDetail, RoleSet, RoleSetForm, SubstoreComponent } from 'app/core/state/models';
import { createExistenceTimeDetail } from 'app/core/state/services/state-creator';
import { RootEpics } from 'app/core/store/epics';
import { SectionList } from 'app/modules/information/containers/section-list/api/section-list.models';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { slideInOut } from '../../../shared/animations';
import { DataUnitBase } from '../../data-unit.base';
import { DataUnitAPIEpics } from '../../data-unit.epics';
import { PeItApiEpics } from '../api/pe-it.epics';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';



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
export class PeItEditableComponent extends DataUnitBase implements AfterViewInit, SubstoreComponent {

  @Input() basePath: string[];

  @Output() remove = new EventEmitter<number>();

  // afterViewInit = false;

  localStore: ObservableStore<PeItDetail>;

  /**
   * Local Store Observables
   */


  @select() pkEntity$: Observable<number>;
  @select() sectionList$: Observable<SectionList>;

  // Visibility of generic elements
  @select() showHeader$: Observable<boolean>;
  @select() showPropertiesHeader$: Observable<boolean>;
  @select() showOntoInfo$: Observable<boolean>
  @select() showCommunityStats$: Observable<boolean>

  // Left Panel Sections
  @select() showProperties$: Observable<boolean>;
  @select() showSectionList$: Observable<boolean>;
  @select() showRepros$: Observable<boolean>;

  // Right Panel Sections
  @select() showMap$: Observable<boolean>;
  @select() showTimeline$: Observable<boolean>;
  @select() showAssertions$: Observable<boolean>;
  @select() showMentionedEntities$: Observable<boolean>;

  // Toggle Buttons (left panel)
  @select() showPropertiesToggle$: Observable<boolean>;
  @select() showSectionListToggle$: Observable<boolean>;
  @select() showReprosToggle$: Observable<boolean>;

  // Toggle Buttons (right panel)
  @select() showMapToggle$: Observable<boolean>;
  @select() showTimelineToggle$: Observable<boolean>;
  @select() showMentionedEntitiesToggle$: Observable<boolean>;
  @select() showAssertionsToggle$: Observable<boolean>;

  // Visibility of container elements, set by function below
  showRightPanel$: Observable<boolean>;
  showLeftPanel$: Observable<boolean>;

  // array of pks of loading leaf-pe-its
  pksOfloadingLeafPeIts: number[] = [];

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
    super(ngRedux, fb, rootEpics, dataUnitEpics);
    console.log('PeItEditableComponent')
  }

  getBasePath = () => this.basePath;


  init() {
    this.basePath = this.getBasePath();

    /**
     * Keeps track of all sections in the right panel.
     * If at least one is visible, show the right panel,
     * else hide it.
     */
    this.showLeftPanel$ = combineLatest(
      this.showProperties$,
      this.showSectionList$,
      this.showRepros$
    ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));


    /**
     * Keeps track of all sections in the right panel.
     * If at least one is visible, show the right panel,
     * else hide it.
     */
    this.showRightPanel$ = combineLatest(
      this.showMap$,
      this.showTimeline$,
      this.showAssertions$,
      this.showMentionedEntities$
    ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));


    this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE];

    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.initPeItSubscriptions()

  }


  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initPeItSubscriptions() {
    this.localStore.select<PeItDetail>('').pipe(
      filter(d => (!!d)),
      takeUntil(this.destroy$)).subscribe(d => {
        this.peItState = d;
        this.isolatedChild = U.extractFieldKeyForIsolation(d._fields);
      })
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.afterViewInit = true;
    // }, 2000)
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

      } else if (o.uiElement.fk_class_field) {

        // if this is a prop set

        if (o.uiElement.fk_class_field === ComConfig.PK_CLASS_FIELD_WHEN) {

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
  * Method to toggle booleans of state.
  * Useful to toggle visibility of ui elements.
  */
  toggle(keyToToggle: string) {
    this.localStore.dispatch(this.actions.toggleBoolean(keyToToggle))
  }

  onRemove = () => this.remove.emit(this.peItState.pkEntity)

}
