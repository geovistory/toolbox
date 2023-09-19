import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProProjectApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { ActiveProjectAction, ActiveProjectActions } from '../../state-gui/actions/active-project.action';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SchemaService } from '../../state-schema/services/schema.service';


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectEpics {
  constructor(
    private projectApi: ProProjectApi,
    private actions: ActiveProjectActions,
    private notificationActions: NotificationsAPIActions,
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
    private schemaObj: SchemaService
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createClosePanelEpic(),
      this.createActivateTabFocusPanelEpic(),
      this.createMoveTabFocusPanelEpic(),
      this.createClosePanelFocusPanelEpic(),
      this.createSplitPanelActivateTabEpic(),
      this.createAddTabCloseListEpic(),
    );
  }

  /**
   * LAYOUT
   */
  private createClosePanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          this.ngRedux.getState().activeProject.panels.forEach((panel, panelIndex) => {
            if (panel.tabs.length === 0) globalStore.next(this.actions.closePanel(panelIndex));
          })
        }))
      )
    }
  }
  private createSplitPanelActivateTabEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.SPLIT_PANEL),
        map((action: ActiveProjectAction) => {
          const p = this.ngRedux.getState().activeProject;
          const c = action.meta.currentPanelIndex;
          const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
          return this.actions.activateTab(panelIndex, 0)
        })
      )
    }
  }
  private createActivateTabFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.ACTIVATE_TAB),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
            globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
          }
        }))
      )
    }
  }
  private createMoveTabFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.MOVE_TAB),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
            globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
          }
        }))
      )
    }
  }
  private createClosePanelFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.CLOSE_PANEL),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel > (this.ngRedux.getState().activeProject.panels.length - 1)) {
            globalStore.next(this.actions.focusPanel(0));
          }
        }))
      )
    }
  }
  private createAddTabCloseListEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.ADD_TAB),
        mapTo(this.actions.setListType(''))
      )
    }
  }

}
