import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { ActiveProjectService, IAppState, Tab, U, UiContext, PeItTabData } from 'app/core';
import { ClassInstanceLabel, PeItDetail, SubstoreComponent, EntityPreview } from 'app/core/state/models';
import { MentioningListOf } from 'app/modules/annotation/components/mentioning-list/mentioning-list.component';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { slideInOut } from '../../shared/animations';
import { PeItDetailAPIActions } from './api/pe-it-detail.actions';
import { peItDetailReducer } from './api/pe-it-detail.reducer';



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
export class PeItDetailComponent implements SubstoreComponent, TabLayoutComponentInterface, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() basePath: string[];

  @Output() remove = new EventEmitter<number>();
  @Output() onLabelChange = new EventEmitter<ClassInstanceLabel>();
  @Output() close = new EventEmitter<void>();

  // afterViewInit = false;

  localStore: ObservableStore<PeItDetail>;

  /**
   * Local Store Observables
   */

  @Input() pkEntity: number;
  @Input() tab: Tab<PeItTabData>;

  // Visibility of header in left area
  @select() showHeader$: Observable<boolean>;

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

  // tabs on the right panel
  activeTab$: Observable<string>;
  activeTabIndex$: Observable<number>;
  tabs$: Observable<string[]>;



  uiContext: UiContext;

  // sourcePeIt$: Observable<InfPersistentItem>
  title$: Observable<string>;
  classLabel$: Observable<string>;
  tabTitle$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>
  preview$: Observable<EntityPreview>

  t: TabLayout;
  listOf: MentioningListOf;

  isViewMode$ = of(false);



  constructor(
    // protected rootEpics: RootEpics,
    // protected epics: PeItDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PeItDetailAPIActions,
    // protected fb: FormBuilder,
    // protected entityEpics: EntityAPIEpics,
    private matDialog: MatDialog,
    public ref: ChangeDetectorRef,
    private p: ActiveProjectService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private inf: InfActions
  ) {
    // super(ngRedux, fb, rootEpics, entityEpics);
    // console.log('PeItEditableComponent')

  }

  // initStore(): void {

  // }


  getBasePath = () => this.basePath;


  ngOnInit() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), peItDetailReducer);

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)
    this.t.setTabLoading(true)

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.inf.persistent_item.loadMinimal(pkProject, this.pkEntity).resolved$
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })
    })

    this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
      this.t.setShowRightArea(b)
    })

    this.listOf = { pkEntity: this.pkEntity, type: 'entity' }


    this.localStore.dispatch(this.actions.init(this.tab.data.peItDetailConfig.peItDetail))

    this.title$ = this.i.pipeLabelOfEntity(this.pkEntity)
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)
    this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    this.preview$ = this.p.streamEntityPreview(this.pkEntity)
    this.tabTitle$ = combineLatest(this.classLabel$, this.title$).pipe(
      map(([classLabel, entityLabel]) => classLabel + ' ' + entityLabel)
    )
    this.preview$.pipe(takeUntil(this.destroy$))
      .subscribe((preview) => {
        this.t.setTabTitle([preview.entity_label, preview.class_label].filter(i => !!i).join(' - '))
      })

    this.pkEntity$ = of(this.pkEntity)

    this.activeTab$ = combineLatest(this.showMap$, this.showSectionList$, this.showMentionedEntities$, this.showSources$)
      .pipe(
        map(([showMap, showSectionList, showMentionedEntities, showSources]) => {
          return showMap ? 'showMap' : showSectionList ? 'showSectionList' : showMentionedEntities ? 'showMentionedEntities' : showSources ? 'showSources' : null
        })
      )

    this.tabs$ = combineLatest(this.showMapToggle$, this.showSectionListToggle$, this.showMentionedEntitiesToggle$, this.showSourcesToggle$)
      .pipe(
        map(([showMap, showSectionList, showMentionedEntities, showSources]) => {
          const x = { showMap, showSectionList, showMentionedEntities, showSources };
          return U.obj2KeyValueArr(x).filter(v => v.value).map(v => v.key);
        })
      )

    this.activeTabIndex$ = combineLatest(this.activeTab$, this.tabs$)
      .pipe(
        map(([activeTab, tabs]) => tabs.indexOf(activeTab))
      )
  }

  openRemoveDialog() {
    this.tabTitle$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe(tabTitle => {
        this.p.openRemovePeItDialog(tabTitle, this.pkEntity)
          .pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.close.emit()
          })
      })
  }

  rightTabIndexChange(i: number) {
    this.tabs$.pipe(first()).subscribe(tabs => {
      this.show(tabs[i]);
    })
  }
  show(keyToShow) {
    this.activeTab$.pipe(first()).subscribe(showRight => {
      this.toggle(showRight)
      this.toggle(keyToShow)
    })
  }

  /**
  * Method to toggle booleans of state.
  * Useful to toggle visibility of ui elements.
  */
  toggle(keyToToggle: string) {
    this.localStore.dispatch(this.actions.toggleBoolean(keyToToggle))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
