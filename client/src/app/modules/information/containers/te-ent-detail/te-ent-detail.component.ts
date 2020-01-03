import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveProjectService, IAppState, Tab, TeEntTabData } from 'app/core';
import { TeEntDetail } from 'app/core/state/models';
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
  @select() showSourcesToggle$: Observable<boolean>;

  @select() toggle$: Observable<boolean>
  @select() showOntoInfo$: Observable<boolean>;


  title$: Observable<string>;
  classLabel$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>

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
    private inf: InfActions
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
    combineLatest(this.classLabel$, this.title$).pipe(takeUntil(this.destroy$))
      .subscribe(([classLabel, entityLabel]) => {
        this.t.setTabTitle(classLabel + ' ' + entityLabel)
      })
    this.pkEntity$ = of(this.pkEntity)

    this.listOf = { pkEntity: this.pkEntity, type: 'entity' }

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
