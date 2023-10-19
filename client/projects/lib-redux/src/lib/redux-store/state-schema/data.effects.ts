import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';
import { IAppState } from '../root/models/model';
import { NotificationsAPIActions } from '../state-gui/actions/notifications.actions';
import { LoadingBarActions } from '../state-gui/loadingbar/loading-bar.actions';
import { paginationObjectActions, schemaModifierActions, schemaObjectActions } from './data.actions';
import { infStatementActions } from './inf/statement/inf-statement.actions';

@Injectable({
  providedIn: 'root'
})
export class DataEffects {

  constructor(
    private notificationActions: NotificationsAPIActions,
    private actions$: Actions<FluxStandardAction<any, any>>,
    private store: Store<IAppState>
  ) { }

  /**
   * Epic for loading GvSchemaObjects
   * - it subscribes to the given observable (payload), which usually triggers a REST API call
   * - on success it stores the GvSchemaObject
   * - else it toasts an error message
   */
  loadSchemaObject$ = createEffect(() => this.actions$.pipe(
    ofType(schemaObjectActions.load),
    mergeMap((action) => action.payload.pipe(
      mergeMap(data => of(
        schemaModifierActions.succeeded({ payload: { positive: data } }),
        LoadingBarActions.REMOVE_JOB()
      )),
      catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
      startWith(LoadingBarActions.ADD_JOB()),
    ))
  ))
  /**
   * Epic for loading GvSchemaModifiers
   * - it subscribes to the given observable (payload), which usually triggers a REST API call
   * - on success it stores the GvSchemaObject
   * - else it toasts an error message
   */
  loadSchemaModifier$ = createEffect(() => this.actions$.pipe(
    ofType(schemaModifierActions.load),
    mergeMap((action) => action.payload.pipe(
      mergeMap(data => of(
        schemaModifierActions.succeeded({ payload: data }),
        LoadingBarActions.REMOVE_JOB()
      )),
      catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
      startWith(LoadingBarActions.ADD_JOB()),
    ))
  ))

  /**
  * Epic for loading GvPaginationObjects
  * - it subscribes to the given observable (payload), which usually triggers a REST API call
  * - on success it stores the GvPaginationObject
  * - else it toasts an error message
  */
  loadPaginationObject$ = createEffect(() => this.actions$.pipe(
    ofType(paginationObjectActions.load),
    mergeMap((action) => action.payload.pipe(
      concatLatestFrom(() => this.store.select((s) => s.activeProject?.pk_project)),
      mergeMap(([data, pkProject]) => {
        const pageLoadedActions = data.subfieldPages.map(p => infStatementActions.loadPageSucceededAction(
          p.paginatedStatements, p.count, p.req.page, pkProject
        ))
        return of(
          ...pageLoadedActions,
          LoadingBarActions.REMOVE_JOB()
        )
      }),
      catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
      startWith(LoadingBarActions.ADD_JOB()),
    ))
  ))




  errorActions(error: HttpErrorResponse) {
    return [
      LoadingBarActions.REMOVE_JOB(),
      this.notificationActions.addToast({
        type: 'error',
        options: {
          title: error.name,
          msg: error.message
        }
      })
    ]
  }
}

