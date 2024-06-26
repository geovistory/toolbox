import { ChangeDetectorRef } from '@angular/core';
import { PanelTab, StateFacade } from '@kleiolab/lib-redux';
import { TabLayoutMode } from '@kleiolab/lib-redux/lib/redux-store/ui/active-project/active-project/tab-layout.models';
import { IOutputData } from 'angular-split/lib/interface';
import { FluxStandardAction } from 'flux-standard-action';
import { Subject, takeUntil } from 'rxjs';


type Payload = PanelTab<any>;
interface MetaData {
  tabTitle?: string,
  tabTooltip?: string,
  loading?: boolean,
  layoutMode?: TabLayoutMode
};
export type TabBaseAPIAction = FluxStandardAction<Payload, MetaData>;

export class TabLayout {


  /**
   * Stuff for handling split area rendering
   * START
   */
  layoutMode: TabLayoutMode;
  defaultSizeRight = 32;
  splitSizeLeft: number;
  splitSizeRight: number;
  useTransition = false;
  private firstActivation = true;

  activated$ = new Subject<void>();

  constructor(
    private state: StateFacade,
    public uiId: string,
    public ref: ChangeDetectorRef,
    public destroy$: Subject<boolean>
  ) {

    this.state.ui.activeProject.getTabLayoutMode(uiId)
      .pipe(takeUntil(destroy$))
      .subscribe((val) => {
        this.layoutMode = val
        this.setSplitSize(val)
      });
  }

  setSplitSize(mode: TabLayoutMode) {
    if (mode == 'left-only') {
      this.splitSizeLeft = 100;
      this.splitSizeRight = 0;
    } else if (mode == 'right-only') {
      this.splitSizeLeft = 0;
      this.splitSizeRight = 100;
    } else {
      this.splitSizeLeft = 100 - this.defaultSizeRight;
      this.splitSizeRight = this.defaultSizeRight
    }
  }

  onActivateTab() {
    this.activated$.next()
    if (this.firstActivation) {
      setTimeout(() => {
        this.setSplitSize(this.layoutMode);
        this.ref.detectChanges()
        this.setSplitSize(this.layoutMode)
        this.ref.detectChanges()
        setTimeout(() => {
          this.useTransition = true;
        })
      })
      this.firstActivation = false;
    }
  }

  beforeDeactivateTab() {
    this.useTransition = false;
  }

  /**
   * When user resizes the areas
   */
  onResizeArea(event: IOutputData) {
    if (typeof event.sizes[1] == 'number' && event.sizes[1] < 5) this.setLayoutMode('left-only')
    if (typeof event.sizes[0] == 'number' && event.sizes[0] < 5) this.setLayoutMode('right-only')
  }

  onRightBtnClick() {
    if (this.layoutMode === 'both') this.setLayoutMode('left-only')
    else if (this.layoutMode === 'right-only') this.setLayoutMode('both')
  }
  onLeftBtnClick() {
    if (this.layoutMode === 'both') this.setLayoutMode('right-only')
    else if (this.layoutMode === 'left-only') this.setLayoutMode('both')
  }

  setTabTitle(title: string) {
    this.state.ui.activeProject.setTabTitle(this.uiId, title)
  }

  setLayoutMode(mode: TabLayoutMode) {
    this.state.ui.activeProject.setTabLayoutMode(this.uiId, mode)
  }

  setTabLoading(loading: boolean) {
    this.state.ui.activeProject.setTabLoading(this.uiId, loading)
  }

  setTabTooltip(tooltip: string) {
    this.state.ui.activeProject.setTabTooltip(this.uiId, tooltip)
  }

}
