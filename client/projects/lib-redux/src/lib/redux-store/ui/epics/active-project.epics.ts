import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IAppState } from '../../state.model';
import { ActiveProjectAction, ActiveProjectActions } from '../../ui/actions/active-project.action';


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectEpics {
  constructor(
    private actions: ActiveProjectActions,
    private actions$: Actions<ActiveProjectAction>,
    private store: Store<IAppState>
  ) { }



  /**
   * LAYOUT
   */
  closePanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL),
      concatLatestFrom(() => this.store.select((s) => s?.activeProject?.panels)),
      mergeMap(([action, panels]) => new Observable<Action>((globalStore) => {
        panels?.forEach((panel, panelIndex) => {
          if (panel.tabs.length === 0) globalStore.next(this.actions.closePanel(panelIndex));
        })
      }))
    )
  )
  splitPanelActivateTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.SPLIT_PANEL),
      concatLatestFrom(() => this.store.select((s) => s?.activeProject)),
      map(([action, p]) => {
        const c = action.meta.currentPanelIndex;
        const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
        return this.actions.activateTab(panelIndex, 0)
      })
    )
  )
  activateTabFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.ACTIVATE_TAB),
      concatLatestFrom(() => this.store.select((s) => s?.activeProject?.focusedPanel)),
      mergeMap(([action, focusedPanel]) => new Observable<Action>((globalStore) => {
        if (focusedPanel !== action.meta.panelIndex) {
          globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
        }
      }))
    )
  )
  moveTabFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.MOVE_TAB),
      concatLatestFrom(() => this.store.select((s) => s?.activeProject?.focusedPanel)),
      mergeMap(([action, focusedPanel]) => new Observable<Action>((globalStore) => {
        if (focusedPanel !== action.meta.currentPanelIndex) {
          globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
        }
      }))
    )
  )
  closePanelFocusPanel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.CLOSE_PANEL),
      concatLatestFrom(() => this.store.select((s) => s?.activeProject)),
      mergeMap(([action, activeProject]) => new Observable<Action>((globalStore) => {
        if (activeProject.focusedPanel > (activeProject.panels.length - 1)) {
          globalStore.next(this.actions.focusPanel(0));
        }
      }))
    )
  )
  addTabCloseList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveProjectActions.ADD_TAB),
      map(() => this.actions.setListType(''))
    )
  )
}
