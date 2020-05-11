import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActiveProjectService, IAppState, IconType, PeItTabData, Tab } from 'app/core';
import { EntityPreview, EntityDetail, SubstoreComponent } from 'app/core/state/models';
import { MentioningListOf } from 'app/modules/annotation/components/mentioning-list/mentioning-list.component';
import { InformationBasicPipesService } from 'app/modules/base/services/information-basic-pipes.service';
import { InformationPipesService } from 'app/modules/base/services/information-pipes.service';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TruncatePipe } from 'app/shared/pipes/truncate/truncate.pipe';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { slideInOut } from '../../shared/animations';
import { EntityDetailAPIActions } from './api/entity-detail.actions';
import { entityDetailReducer } from './api/entity-detail.reducer';




@WithSubStore({
  localReducer: entityDetailReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailComponent implements SubstoreComponent, TabLayoutComponentInterface, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() basePath: string[];

  @Output() remove = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  // afterViewInit = false;

  localStore: ObservableStore<EntityDetail>;

  /**
   * Local Store Observables
   */

  @Input() pkEntity: number;
  @Input() tab: Tab<PeItTabData>;

  // // Visibility of header in left area
  @select() showHeader$: Observable<boolean>;

  // Visibility of right area
  @select() showRightArea$: Observable<boolean>;

  // // Visibility of generic elements
  @select() showOntoInfo$: Observable<boolean>
  // @select() showCommunityStats$: Observable<boolean>

  // Left Panel Sections
  @select() showProperties$: Observable<boolean>;

  @select() rightPanelActiveTab$: Observable<number>;
  @select() rightPanelTabs$: Observable<string[]>;

  // sourcePeIt$: Observable<InfPersistentItem>
  title$: Observable<string>;
  classLabel$: Observable<string>;
  tabTitle$: Observable<string>;
  tabTooltip$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>
  preview$: Observable<EntityPreview>

  t: TabLayout;
  listOf: MentioningListOf;

  isViewMode$ = of(false);

  iconType$: Observable<IconType>;


  constructor(

    public ngRedux: NgRedux<IAppState>,
    protected actions: EntityDetailAPIActions,
    private matDialog: MatDialog,
    public ref: ChangeDetectorRef,
    private p: ActiveProjectService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private inf: InfActions,
    private truncatePipe: TruncatePipe

  ) {


  }


  getBasePath = () => this.basePath;


  ngOnInit() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), entityDetailReducer);

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)
    this.t.setTabLoading(true)

    this.preview$ = this.p.streamEntityPreview(this.pkEntity, true)

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      // TODO merge persistent_item and temporal_entity tables
      combineLatest(
        this.inf.persistent_item.loadMinimal(pkProject, this.pkEntity).resolved$,
        this.inf.temporal_entity.loadNestedObject(pkProject, this.pkEntity).resolved$
      ).pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
        this.t.setTabLoading(false)
      })

    })

    this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
      this.t.setLayoutMode(b ? 'both' : 'left-only')
    })

    this.listOf = { pkEntity: this.pkEntity, type: 'entity' }


    this.localStore.dispatch(this.actions.init(this.tab.data.peItDetailConfig.peItDetail))

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

    this.iconType$ = this.b.pipeIconType(this.pkEntity)

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

  rightTabIndexChange(i: number) {
    this.localStore.dispatch(this.actions.setRightPanelActiveTab(i))
  }

  rightArrowClick() {
    if (this.t.layoutMode == 'right-only') this.t.setLayoutMode('both');
    else this.t.setLayoutMode('left-only')
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
