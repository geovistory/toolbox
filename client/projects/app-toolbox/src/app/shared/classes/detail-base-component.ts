import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../core/active-project/active-project.service';
import { TabBody } from '../../modules/projects/containers/project-edit/project-edit.component';
import { TabLayoutComponentInterface } from '../../modules/projects/directives/on-activate-tab.directive';
import { TabLayout } from '../components/tab-layout/tab-layout';
import { TruncatePipe } from '../pipes/truncate/truncate.pipe';

interface ConfigBase { pkEntity: number }

@Component({
  selector: 'gv-detail-base',
  template: `<!-- dont use me directly -->`
})
export abstract class DetailBaseComponent<Config extends ConfigBase> implements OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  @Input() tab: TabBody<Config>;
  showOntoInfo$ = new BehaviorSubject(false);
  readonly$ = new BehaviorSubject(true);

  pkEntity: number;
  t: TabLayout;

  title$: Observable<string>;
  classLabel$: Observable<string>;
  tabTitle$: Observable<string>;
  tabTooltip$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>;
  preview$: Observable<WarEntityPreview>;
  scope$: Observable<GvFieldPageScope>;
  source: GvFieldSourceEntity;

  @HostListener('document:keypress', ['$event']) async handleKeyboardEvent(event: KeyboardEvent) {
    if (!event.shiftKey) {
      return;
    }
    if (!['E', 'O'].includes(event.key)) {
      return;
    }
    if (!this.tab.active) {
      return;
    }
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    const focusedPanelIndex = await this.p.focusedPanel$.pipe(first()).toPromise();
    const panels = await this.p.panels$.pipe(first()).toPromise();
    const focusedPanelId = panels[focusedPanelIndex]?.id;
    if (this.tab.panelId !== focusedPanelId) {
      return;
    }

    if (event.key === 'E') {
      this.readonly$.next(!this.readonly$.value);
    }
    if (event.key === 'O') {
      this.showOntoInfo$.next(!this.showOntoInfo$.value);
    }
  }

  constructor(
    protected p: ActiveProjectService,
    protected dialog: MatDialog,
    protected ref: ChangeDetectorRef,
    private ap: ActiveProjectPipesService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private truncatePipe: TruncatePipe,
    private dataService: ReduxMainService
  ) { }

  protected initialize() {
    this.pkEntity = this.tab.data.pkEntity;
    // this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), entityDetailReducer);
    this.t = new TabLayout(this.tab.path[2], this.ref, this.destroy$);
    this.t.setTabLoading(true);


    this.scope$ = this.ap.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.dataService.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false);
        });

    });

    this.t.setLayoutMode('left-only');



    this.preview$ = this.ap.streamEntityPreview(this.pkEntity, true);
    this.title$ = this.i.pipeLabelOfEntity(this.pkEntity);
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity);
    this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity);
    this.tabTitle$ = combineLatest(this.preview$, this.classLabel$).pipe(
      map(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ');
      })
    );
    this.tabTitle$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTitle) => {
        this.t.setTabTitle(tabTitle);
      });

    this.tabTooltip$ = combineLatest(this.preview$, this.classLabel$).pipe(
      map(([preview, classLabel]) => {
        return [classLabel, preview.entity_label].filter(i => !!i).join(' - ');
      })
    );
    this.tabTooltip$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTooltip) => {
        this.t.setTabTooltip(tabTooltip);
      });

    this.pkEntity$ = of(this.pkEntity);
    this.source = { fkInfo: this.pkEntity };
  }

  closeTab() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
