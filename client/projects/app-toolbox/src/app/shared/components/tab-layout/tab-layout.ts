import { dispatch, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef } from '@angular/core';
import { PanelTab, TabLayoutMode } from '@kleiolab/lib-redux';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabLayoutAcitons } from './tab-layout.actions';
import { tabBaseReducer } from './tab-layout.reducer';


type Payload = PanelTab<any>;
interface MetaData {
  tabTitle?: string,
  tabTooltip?: string,
  loading?: boolean,
  layoutMode?: TabLayoutMode
};
export type TabBaseAPIAction = FluxStandardAction<Payload, MetaData>;

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: tabBaseReducer
})
export class TabLayout {

  // pase path of this component
  basePath: string[];

  /**
   * Stuff for handling split area rendering
   * START
   */
  @select() layoutMode$: Observable<TabLayoutMode>;
  layoutMode: TabLayoutMode;
  defaultSizeRight = 32;
  splitSizeLeft: number;
  splitSizeRight: number;
  useTransition = false;
  private firstActivation = true;

  activated$ = new Subject<void>();

  constructor(public uiId: string, public ref: ChangeDetectorRef, public destroy$: Subject<boolean>) {
    this.basePath = ['activeProject', 'tabLayouts', this.uiId]
    this.layoutMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.layoutMode = mode;
      this.setSplitSize(mode)
    })
  }
  getBasePath = () => this.basePath;

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
  onResizeArea(event: { gutterNum: number, sizes: Array<number> }) {
    if (event.sizes[1] < 5) this.setLayoutMode('left-only')
    if (event.sizes[0] < 5) this.setLayoutMode('right-only')
  }


  /**
   * END
   * Stuff for handling split area rendering
   */


  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle: string): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
  *  Set tab tooltip
  *********************************************************************/
  @dispatch()
  setTabTooltip = (tabTooltip: string): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_TOOLTIP,
    meta: { tabTooltip },
    payload: null,
  });

  /*********************************************************************
  *  Set tab loading
  *********************************************************************/
  @dispatch()
  setTabLoading = (loading: boolean): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_TAB_LOADING,
    meta: { loading },
    payload: null,
  });

  /*********************************************************************
  *  Set right panel state
  *********************************************************************/
  @dispatch()
  setLayoutMode = (layoutMode: TabLayoutMode): TabBaseAPIAction => ({
    type: TabLayoutAcitons.SET_LAYOUT_MODE,
    meta: { layoutMode: layoutMode },
    payload: null,
  });


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TabBaseAPIAction => ({
    type: TabLayoutAcitons.DESTROY,
    meta: null,
    payload: null
  })
}
