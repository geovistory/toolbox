import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveProjectService, IAppState, Tab, TeEntTabData, IconType } from 'app/core';
import { TeEntDetail, EntityPreview } from 'app/core/state/models';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { RootEpics } from '../../../../core/store/epics';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { slideInOut } from '../../shared/animations';
import { TeEntDetailAPIActions } from './api/te-ent-detail.actions';
import { teEntDetailReducer } from './api/te-ent-detail.reducer';
import { MentioningListOf } from 'app/modules/annotation/components/mentioning-list/mentioning-list.component';
import { TruncatePipe } from 'app/shared/pipes/truncate/truncate.pipe';


@WithSubStore({
  localReducer: teEntDetailReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-te-ent-detail',
  templateUrl: './te-ent-detail.component.html',
  styleUrls: ['./te-ent-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeEntDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  @Input() basePath: string[];
  @Input() pkEntity: number;
  @Input() tab: Tab<TeEntTabData>;


  localStore: ObservableStore<TeEntDetail>;

  @select() showHeader$: Observable<boolean>;
  @select() showRightArea$: Observable<boolean>;

  @select() showSources$: Observable<boolean>;
  @select() showDigitals$: Observable<boolean>;

  @select() showSourcesToggle$: Observable<boolean>;
  @select() showDigitalsToggle$: Observable<boolean>;

  @select() toggle$: Observable<boolean>
  @select() showOntoInfo$: Observable<boolean>;


  title$: Observable<string>;
  classLabel$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>
  preview$: Observable<EntityPreview>
  iconType$: Observable<IconType>;

  t: TabLayout;
  listOf: MentioningListOf;

  constructor(
    protected rootEpics: RootEpics,
    // protected epics: TeEntDetailAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    protected actions: TeEntDetailAPIActions,
    protected fb: FormBuilder,
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
    this.localStore = this.ngRedux.configureSubStore(this.basePath, teEntDetailReducer);

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)
    this.t.setTabLoading(true)

    this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
      this.t.setShowRightArea(b)
    })

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.inf.temporal_entity.loadNestedObject(pkProject, this.pkEntity).resolved$
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })
    })
    this.localStore.dispatch(this.actions.init(this.tab.data.teEntDetailConfig.teEntDetail))


    this.title$ = this.i.pipeLabelOfEntity(this.pkEntity)
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)
    this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    this.preview$ = this.p.streamEntityPreview(this.pkEntity)
    combineLatest(this.preview$, this.classLabel$).pipe(takeUntil(this.destroy$))
      .subscribe(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        this.t.setTabTitle([trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - '))
        this.t.setTabTooltip([classLabel, preview.entity_label].filter(i => !!i).join(' - '))
      })


    this.pkEntity$ = of(this.pkEntity)

    this.listOf = { pkEntity: this.pkEntity, type: 'entity' }

    this.iconType$ = this.b.pipeIconType(this.pkEntity, 'peIt')

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
