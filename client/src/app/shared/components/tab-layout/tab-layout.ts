import { dispatch, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef } from '@angular/core';
import { Tab } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tabBaseReducer } from './tab-layout.reducer';
import { TabLayoutActions } from './tab-layout.actions';
import { TabLayoutAction } from './tab-layout.models';



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
  @select() showRightArea$: Observable<boolean>;
  showRightArea: boolean;
  defaultSizeRight = 32;
  splitSizeLeft: number;
  splitSizeRight: number;
  useTransition = false;
  private firstActivation = true;

  activated$ = new Subject<void>();

  constructor(public uiId: string, public ref: ChangeDetectorRef, public destroy$: Subject<boolean>) {
    this.basePath = ['activeProject', 'tabLayouts', this.uiId]
    this.showRightArea$.pipe(takeUntil(this.destroy$)).subscribe(bool => {
      this.showRightArea = bool;
      this.setSplitSize(bool)
    })
  }
  getBasePath = () => this.basePath;

  setSplitSize(bool) {
    this.splitSizeLeft = bool ? (100 - this.defaultSizeRight) : 100;
    this.splitSizeRight = bool ? this.defaultSizeRight : 0;
  }

  onActivateTab() {
    this.activated$.next()
    if (this.firstActivation) {
      setTimeout(() => {
        this.setSplitSize(!this.showRightArea);
        this.ref.detectChanges()
        this.setSplitSize(this.showRightArea)
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
    if (event.sizes[1] < 5) this.setShowRightArea(false)
  }


  /**
   * END
   * Stuff for handling split area rendering
   */

  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle: string): TabLayoutAction => ({
    type: TabLayoutActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
  *  Set tab tooltip
  *********************************************************************/
  @dispatch()
  setTabTooltip = (tabTooltip: string): TabLayoutAction => ({
    type: TabLayoutActions.SET_TAB_TOOLTIP,
    meta: { tabTooltip },
    payload: null,
  });

  /*********************************************************************
  *  Set tab loading
  *********************************************************************/
  @dispatch()
  setTabLoading = (loading: boolean): TabLayoutAction => ({
    type: TabLayoutActions.SET_TAB_LOADING,
    meta: { loading },
    payload: null,
  });

  /*********************************************************************
  *  Set right panel state
  *********************************************************************/
  @dispatch()
  setShowRightArea = (showRightArea: boolean): TabLayoutAction => ({
    type: TabLayoutActions.SET_SHOW_RIGHT_AREA,
    meta: { showRightArea },
    payload: null,
  });


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TabLayoutAction => ({
    type: TabLayoutActions.DESTROY,
    meta: null,
    payload: null
  })
}
