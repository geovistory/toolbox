import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { IAppState } from '../../state.model';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';
import { getActiveProjectState, getFocusedPanel, getPanels } from './active-project.selectors';


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectEffects {
  constructor(
    private actions$: Actions<ActiveProjectAction>,
    private store: Store<IAppState>
  ) { }



  /**
   * LAYOUT
   */
  closePanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL),
      concatLatestFrom(() => this.store.select(getPanels)),
      mergeMap(([, panels]) => new Observable<Action>((actions$) => {
        panels?.forEach((panel, panelIndex) => {
          if (panel.tabs.length === 0) actions$.next(ActiveProjectActions.closePanel(panelIndex));
        })
      }))
    )
  )
  splitPanelActivateTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.SPLIT_PANEL),
      concatLatestFrom(() => this.store.select(getPanels)),
      map(([action, panels]) => {
        const c = action.meta.currentPanelIndex;
        const panelIndex = panels.length < (c + 1) ? c - 1 : c;
        return ActiveProjectActions.activateTab(panelIndex, 0)
      })
    )
  )
  activateTabFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.ACTIVATE_TAB),
      concatLatestFrom(() => this.store.select(getFocusedPanel)),
      filter(([action, focusedPanel]) => (focusedPanel !== action.meta.panelIndex)),
      map(([action]) => ActiveProjectActions.focusPanel(action.meta.panelIndex))
    )
  )
  moveTabFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.MOVE_TAB),
      concatLatestFrom(() => this.store.select(getFocusedPanel)),
      filter(([action, focusedPanel]) => (focusedPanel !== action.meta.currentPanelIndex)),
      map(([action]) => ActiveProjectActions.focusPanel(action.meta.currentPanelIndex))
    )
  )
  closePanelFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.CLOSE_PANEL),
      concatLatestFrom(() => this.store.select(getActiveProjectState)),
      filter(([, activeProject]) => (activeProject.focusedPanel > (activeProject.panels.length - 1))),
      map(() => ActiveProjectActions.focusPanel(0))
    )
  )
  addTabCloseList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.ADD_TAB),
      map(() => ActiveProjectActions.setListType(''))
    )
  )
}
