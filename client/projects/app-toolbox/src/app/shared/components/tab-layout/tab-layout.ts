import { ChangeDetectorRef } from '@angular/core';
import { PanelTab } from '@kleiolab/lib-redux/lib/redux-store/ui/active-project/active-project.models';
import { TabLayoutMode } from '@kleiolab/lib-redux/lib/redux-store/ui/active-project/active-project/tab-layout.models';
import { IOutputData } from 'angular-split/lib/interface';
import { FluxStandardAction } from 'flux-standard-action';
import { Subject } from 'rxjs';
import { TabLayoutAcitons } from './tab-layout.actions';


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
    public uiId: string, public ref: ChangeDetectorRef, public destroy$: Subject<boolean>
  ) {
    // this.layoutMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
    //   this.layoutMode = mode;
    //   this.setSplitSize(mode)
    // })
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
    if (event.sizes[1] < 5) this.setLayoutMode('left-only')
    if (event.sizes[0] < 5) this.setLayoutMode('right-only')
  }

  onRightBtnClick() {
    if (this.layoutMode === 'both') this.setLayoutMode('left-only')
    else if (this.layoutMode === 'right-only') this.setLayoutMode('both')
  }
  onLeftBtnClick() {
    if (this.layoutMode === 'both') this.setLayoutMode('right-only')
    else if (this.layoutMode === 'left-only') this.setLayoutMode('both')
  }

  /**
   * END
   * Stuff for handling split area rendering
   */


  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  setTabTitle = (tabTitle: string): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
  *  Set tab tooltip
  *********************************************************************/
  setTabTooltip = (tabTooltip: string): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_TOOLTIP,
    meta: { tabTooltip },
    payload: null,
  });

  /*********************************************************************
  *  Set tab loading
  *********************************************************************/
  setTabLoading = (loading: boolean): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_LOADING,
    meta: { loading },
    payload: null,
  });

  /*********************************************************************
  *  Set right panel state
  *********************************************************************/
  setLayoutMode = (layoutMode: TabLayoutMode): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_LAYOUT_MODE,
    meta: { layoutMode: layoutMode },
    payload: null,
  });


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  destroy = (): TabBaseAPIAction => ({
    type: TabLayoutAcitons.DESTROY,
    meta: null,
    payload: null
  })
}
