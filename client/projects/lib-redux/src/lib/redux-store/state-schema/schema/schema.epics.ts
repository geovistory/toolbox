import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { LoadingBarActions } from '../../state-gui/loadingbar/loading-bar.actions';
import { infStatementActions } from '../inf/statement/inf-statement.actions';
import { GvPaginationObjectAction, GvSchemaActions, GvSchemaModifierAction, GvSchemaObjectAction } from './schema.actions';
import { SchemaService } from './schema.service';

@Injectable({
  providedIn: 'root'
})
export class SchemaEpics {


  /**
   * Epic for loading GvSchemaObjects
   * - it subscribes to the given observable (payload), which usually triggers a REST API call
   * - on success it stores the GvSchemaObject
   * - else it toasts an error message
   */
  loadSchemaObject$ = createEffect(() => this.actions$.pipe(
    ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD),
    mergeMap((action: GvSchemaObjectAction) => action.payload.pipe(
      mergeMap(data => of(
        this.schemaObjectService.getStoreSchemaObjectGvAction(data),
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
    ofType(GvSchemaActions.GV_SCHEMA_MODIFIER_LOAD),
    mergeMap((action: GvSchemaModifierAction) => action.payload.pipe(
      mergeMap(data => of(
        this.schemaObjectService.getStoreSchemaObjectGvAction(data.positive),
        ...this.schemaObjectService.getDeleteSchemaObjectGvActions(data.negative, 0),
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
    ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD),
    mergeMap((action: GvPaginationObjectAction) => action.payload.pipe(
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


  constructor(
    private schemaObjectService: SchemaService,
    private notificationActions: NotificationsAPIActions,
    private actions$: Actions<FluxStandardAction<any, any>>,
    private store: Store<IAppState>
  ) { }


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

