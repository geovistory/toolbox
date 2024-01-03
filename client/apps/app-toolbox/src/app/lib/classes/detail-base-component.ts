import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IOutputData } from 'angular-split/lib/interface';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TabLayoutComponentInterface } from '../../directives/on-activate-tab.directive';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../services/active-project.service';
import { EditModeService } from '../../services/edit-mode.service';
import { TabLayoutService } from '../../services/tab-layout.service';
import { TabBody } from '../types/TabBody';

interface ConfigBase { pkEntity: number }

@Component({
  selector: 'gv-detail-base',
  template: `<!-- dont use me directly -->`
})
export abstract class DetailBaseComponent<Config extends ConfigBase> implements OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  @Input() tab: TabBody<Config>;
  showOntoInfo$ = new BehaviorSubject(false);
  readmode$ = new BehaviorSubject(true);

  pkEntity: number;

  title$: Observable<string>;
  classLabel$: Observable<string>;
  tabTitle$: Observable<string>;
  tabTooltip$: Observable<string>;
  fkClass$: Observable<number>;
  pkEntity$: Observable<number>;
  preview$: Observable<WarEntityPreview>;
  scope$: Observable<GvFieldPageScope>;
  source: GvFieldSourceEntity;

  @ViewChildren(MatTabGroup) matTabGroup: QueryList<MatTabGroup>

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
    if ((event.target as HTMLElement)?.getAttribute('class') === 'ql-editor') {
      return;
    }
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    const focusedPanelIndex = await this.state.ui.activeProject.focusedPanel$.pipe(first()).toPromise();
    const panels = await this.state.ui.activeProject.panels$.pipe(first()).toPromise();
    const focusedPanelId = panels[focusedPanelIndex]?.id;
    if (this.tab.panelId !== focusedPanelId) {
      return;
    }

    if (event.key === 'E') {
      this.editMode.toggleValue();
    }
    if (event.key === 'O') {
      this.showOntoInfo$.next(!this.showOntoInfo$.value);
    }
  }

  get tabUuid() {
    return this.tab.path[2]
  }

  constructor(
    protected p: ActiveProjectService,
    protected dialog: MatDialog,
    protected ref: ChangeDetectorRef,
    private ap: ActiveProjectPipesService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private truncatePipe: TruncatePipe,
    private state: StateFacade,
    public editMode: EditModeService,
    public tabLayout: TabLayoutService
  ) { }

  protected initialize() {
    this.pkEntity = this.tab.data.pkEntity;
    this.tabLayout.t.setTabLoading(true);


    this.scope$ = this.state.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.state.data.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.tabLayout.t.setTabLoading(false);
        });

    });

    this.tabLayout.t.setLayoutMode('left-only');

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
        this.tabLayout.t.setTabTitle(tabTitle);
      });

    this.tabTooltip$ = combineLatest(this.preview$, this.classLabel$).pipe(
      map(([preview, classLabel]) => {
        return [classLabel, preview.entity_label].filter(i => !!i).join(' - ');
      })
    );
    this.tabTooltip$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTooltip) => {
        this.tabLayout.t.setTabTooltip(tabTooltip);
      });

    this.pkEntity$ = of(this.pkEntity);
    this.source = { fkInfo: this.pkEntity };
  }

  closeTab() {
    this.state.ui.activeProject.closeTab(this.tab.panelIndex, this.tab.tabIndex)
  }

  onSplitAreaDragEnd(e: IOutputData) {
    this.tabLayout.t.onResizeArea(e)
    this.matTabGroup.forEach(item => item.realignInkBar())
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
