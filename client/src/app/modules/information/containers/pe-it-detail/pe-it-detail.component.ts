import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveProjectService, IAppState, InfPersistentItem, U, UiContext, TabData, Tab } from 'app/core';
import { AddOption, ClassInstanceLabel, CollapsedExpanded, PeItDetail, PropertyField, PropertyFieldForm, SubstoreComponent } from 'app/core/state/models';
import { TextPropertyField } from 'app/core/state/models/text-property-field';
import { RootEpics } from 'app/core/store/epics';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { Observable, combineLatest } from 'rxjs';
import { filter, first, takeUntil, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { EntityBase } from '../../entity/entity.base';
import { EntityAPIEpics } from '../../entity/entity.epics';
import { slideInOut } from '../../shared/animations';
import { PeItDetailAPIActions } from './api/pe-it-detail.actions';
import { PeItDetailAPIEpics } from './api/pe-it-detail.epics';
import { peItDetailReducer } from './api/pe-it-detail.reducer';
import { pathOr } from 'ramda';
import { InfActions } from '../../../../core/inf/inf.actions';



@WithSubStore({
  localReducer: peItDetailReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-detail',
  templateUrl: './pe-it-detail.component.html',
  styleUrls: ['./pe-it-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeItDetailComponent extends EntityBase implements AfterViewInit, SubstoreComponent, TabLayoutComponentInterface {


  @Output() remove = new EventEmitter<number>();
  @Output() onLabelChange = new EventEmitter<ClassInstanceLabel>();

  // afterViewInit = false;

  localStore: ObservableStore<PeItDetail>;

  /**
   * Local Store Observables
   */

  @Input() pkEntity: number;
  @Input() tab: Tab;

  @select() pkEntity$: Observable<number>;

  // Visibility of right area
  @select() showRightArea$: Observable<boolean>;

  // Visibility of generic elements
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
  @select() showSources$: Observable<boolean>;

  // Toggle Buttons (left panel)
  @select() showPropertiesToggle$: Observable<boolean>;
  @select() showSectionListToggle$: Observable<boolean>;
  @select() showReprosToggle$: Observable<boolean>;

  // Toggle Buttons (right panel)
  @select() showMapToggle$: Observable<boolean>;
  @select() showTimelineToggle$: Observable<boolean>;
  @select() showMentionedEntitiesToggle$: Observable<boolean>;
  @select() showAssertionsToggle$: Observable<boolean>;
  @select() showSourcesToggle$: Observable<boolean>;

  // Visibility of container elements, set by function below
  // showRightPanel$: Observable<boolean>;
  // showLeftPanel$: Observable<boolean>;

  // array of pks of loading leaf-pe-its
  pksOfloadingLeafPeIts: number[] = [];

  uiContext: UiContext;

  /**
   * Class properties that filled by a store observable
   */
  peItState: PeItDetail;

  // if this variable is set, only that child is shown, all other elements are hidden
  isolatedChild: string;

  // The pe
  sourcePeIt$: Observable<InfPersistentItem>

  t: TabLayout;

  constructor(
    protected rootEpics: RootEpics,
    protected epics: PeItDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PeItDetailAPIActions,
    private p: ActiveProjectService,
    protected fb: FormBuilder,
    protected entityEpics: EntityAPIEpics,
    public ref: ChangeDetectorRef,
    private inf: InfActions
  ) {
    super(ngRedux, fb, rootEpics, entityEpics);
    console.log('PeItEditableComponent')

  }

  initStore(): void {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItDetailReducer);
  }


  getBasePath = () => this.basePath;


  init() {
    this.basePath = this.getBasePath();

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
      this.t.setShowRightArea(b)
    })

    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(
      this.p.pkProject$,
      this.p.crm$
    ).pipe(first((x => !x.includes(undefined) && !!this.tab)), takeUntil(this.destroy$))
      .subscribe(([pkProject, crm]) => {

        this.inf.persistent_item.loadNestedObject(pkProject, this.pkEntity)

        // TDOD: Delete this and the load epic as well
        this.localStore.dispatch(this.actions.load(
          this.pkEntity,
          pkProject,
          this.tab.data.peItDetailConfig.peItDetail,
          this.tab.data.peItDetailConfig.stateSettings,
          crm
        ))
      })

    this._fields$.pipe(
      map(fields => U.labelFromFieldList(fields, { path: [], fieldsMax: 1, rolesMax: 1 })),
      map(label => pathOr('', ['parts', '0', 'roleLabels', '0', 'string'], label)),
      distinctUntilChanged((a, b) => a === b)
    ).subscribe((label) => {
      this.t.setTabTitle(label)
    })

    // /**
    //  * Keeps track of all sections in the right panel.
    //  * If at least one is visible, show the right panel,
    //  * else hide it.
    //  */
    // this.showLeftPanel$ = combineLatest(
    //   this.showProperties$,
    //   this.showSectionList$,
    //   this.showRepros$
    // ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));


    // /**
    //  * Keeps track of all sections in the right panel.
    //  * If at least one is visible, show the right panel,
    //  * else hide it.
    //  */
    // this.showRightPanel$ = combineLatest(
    //   this.showMap$,
    //   this.showTimeline$,
    //   this.showAssertions$,
    //   this.showMentionedEntities$,
    //   this.showSources$
    // ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));



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

      if (o.uiElement.propertyFieldKey) {

        // if this is a role set

        // prepare the PropertyField

        const newPropertyField = {
          ...new PropertyField(this.classConfig.propertyFields[o.uiElement.propertyFieldKey]),
          toggle: 'expanded' as CollapsedExpanded,
          rolesNotInProjectLoading: true,
          roleStatesInOtherProjectsVisible: false,
          _property_field_form: new PropertyFieldForm()
        }

        this.addPropertyField(newPropertyField, undefined)

      } else if (o.uiElement.fk_class_field) {

        const crm = this.ngRedux.getState().activeProject.crm;
        const fieldKey = o.uiElement.propSetKey;
        let field;

        switch (crm.fieldList[fieldKey].type) {

          case 'TextPropertyField':

            const fkClassField = crm.fieldList[fieldKey].fkClassField;
            field = new TextPropertyField({
              textPropertyDetailList: {},
              fkClassField,
              pkUiContext: this.uiContext.pk_entity,
              createOrAdd: {}
            })

            break;
        }

        // if this is a class field
        this.addPropSet(o.uiElement.propSetKey, field)

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

  onAnnotate() {
    if (this.localStore.getState().showMentionedEntities === false) {
      this.toggle('showMentionedEntities');
    }
    this.localStore.dispatch(this.actions.startCreateMentioning())
  }

}
