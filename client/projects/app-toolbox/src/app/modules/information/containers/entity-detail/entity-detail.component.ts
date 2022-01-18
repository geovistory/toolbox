import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, SectionName } from '@kleiolab/lib-queries';
import { IAppState, PanelTab } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/services/reduxMain.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { TabLayoutComponentInterface } from '../../../projects/directives/on-activate-tab.directive';
import { slideInOut } from '../../shared/animations';
// import { EntityDetailAPIActions } from './api/entity-detail.actions';
// import { entityDetailReducer } from './api/entity-detail.reducer';


export interface EntityDetailConfig {
  pkEntity: number,
  showContentTree: boolean,
  showLinkedSources: boolean
  showLinkedEntities: boolean
  showFactoids: boolean
  showAnnotations: boolean // anntotations where this entity is referred to by an annotation
}

// @WithSubStore({
//   // localReducer: entityDetailReducer,
//   basePathMethodName: 'getBasePath'
// })
@Component({
  selector: 'gv-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailComponent implements TabLayoutComponentInterface, OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() basePath: string[];

  @Output() remove = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  // afterViewInit = false;

  // localStore: ObservableStore<EntityDetail>;

  /**
   * Local Store Observables
   */

  @Input() tab: PanelTab<EntityDetailConfig>;
  pkEntity: number

  // // // Visibility of header in left area
  // @select() showHeader$: Observable<boolean>;

  // // Visibility of right area
  // @select() showRightArea$: Observable<boolean>;

  // // Visibility of generic elements
  showOntoInfo$ = new BehaviorSubject(false)
  // @select() showCommunityStats$: Observable<boolean>

  // Left Panel Sections
  // @select() showProperties$: Observable<boolean>;

  // @select() rightPanelActiveTab$: Observable<number>;
  // @select() rightPanelTabs$: Observable<string[]>;

  // sourcePeIt$: Observable<InfPersistentItem>
  title$: Observable<string>;
  classLabel$: Observable<string>;
  tabTitle$: Observable<string>;
  tabTooltip$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>
  preview$: Observable<WarEntityPreview>
  source: GvFieldSourceEntity

  t: TabLayout;

  scope$: Observable<GvFieldPageScope>

  readonly$ = new BehaviorSubject(false)

  linkedSources = SectionName.linkedSources;
  linkedEntities = SectionName.linkedEntities;

  constructor(

    public ngRedux: NgRedux<IAppState>,
    // protected actions: EntityDetailAPIActions,
    public ref: ChangeDetectorRef,
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private truncatePipe: TruncatePipe,
    private dataService: ReduxMainService

  ) {


  }


  getBasePath = () => this.basePath;


  ngOnInit() {
    this.basePath = this.getBasePath();
    this.pkEntity = this.tab.data.pkEntity
    // this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), entityDetailReducer);

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)
    this.t.setTabLoading(true)


    this.scope$ = this.ap.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.dataService.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })

    })

    // this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
    //   this.t.setLayoutMode(b ? 'both' : 'left-only')
    // })

    this.t.setLayoutMode('left-only')


    // this.localStore.dispatch(this.actions.init(this.tab.data.peItDetailConfig.peItDetail))

    this.preview$ = this.ap.streamEntityPreview(this.pkEntity, true)
    this.title$ = this.i.pipeLabelOfEntity(this.pkEntity)
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)
    this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    this.tabTitle$ = combineLatest(this.preview$, this.classLabel$).pipe(
      map(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ')
      })
    )
    this.tabTitle$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTitle) => {
        this.t.setTabTitle(tabTitle)
      })

    this.tabTooltip$ = combineLatest(this.preview$, this.classLabel$).pipe(
      map(([preview, classLabel]) => {
        return [classLabel, preview.entity_label].filter(i => !!i).join(' - ')
      })
    )
    this.tabTooltip$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTooltip) => {
        this.t.setTabTooltip(tabTooltip)
      })

    this.pkEntity$ = of(this.pkEntity)
    this.source = { fkInfo: this.pkEntity }

  }


  openRemoveDialog() {
    this.tabTitle$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe(tabTitle => {
        this.p.openRemoveEntityDialog(tabTitle, this.pkEntity)
          .pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.close.emit()
          })
      })
  }

  // rightTabIndexChange(i: number) {
  //   this.localStore.dispatch(this.actions.setRightPanelActiveTab(i))
  // }

  rightArrowClick() {
    if (this.t.layoutMode == 'right-only') this.t.setLayoutMode('both');
    else this.t.setLayoutMode('left-only')
  }

  // /**
  // * Method to toggle booleans of state.
  // * Useful to toggle visibility of ui elements.
  // */
  // toggle(keyToToggle: string) {
  //   this.localStore.dispatch(this.actions.toggleBoolean(keyToToggle))
  // }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
