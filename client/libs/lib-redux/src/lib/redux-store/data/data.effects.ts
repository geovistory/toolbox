import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { StateFacade } from '../state.facade';
import { IAppState } from '../state.model';
import { getActiveProjectId } from '../ui/active-project/active-project.selectors';
import { LoadingBarActions } from '../ui/loading-bar/loading-bar.actions';
import { notificationActions } from '../ui/notification/notification.actions';
import { paginationObjectActions, schemaModifierActions, schemaObjectActions } from './data.actions';
import { paginationActions } from './inf/statement/pagination/pagination.actions';

@Injectable({
  providedIn: 'root'
})
export class DataEffects {

  constructor(
    private actions$: Actions<FluxStandardAction<any, any>>,
    private store: Store<IAppState>,
    private facade: StateFacade,
    private entityPreviewSocket: EntityPreviewSocket
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
 * Epic for loading GvSchemaModifiers
 * - it subscribes to the given observable (payload), which usually triggers a REST API call
 * - on success it stores the GvSchemaObject
 * - else it toasts an error message
 */
  loadSchemaModifierWithMapper$ = createEffect(() => this.actions$.pipe(
    ofType(schemaModifierActions.loadWithMapper),
    mergeMap((action) => action.data$.pipe(
      mergeMap(data => {
        const schemaModifier = action.mapper(data);
        return of(
          schemaModifierActions.succeeded({ payload: schemaModifier }),
          LoadingBarActions.REMOVE_JOB()
        )
      }),
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
      concatLatestFrom(() => this.store.select(getActiveProjectId)),
      mergeMap(([data, pkProject]) => {
        const pages = data.subfieldPages.map(p => ({ statements: p.paginatedStatements, count: p.count, page: p.req.page, pk: pkProject }))
        const pagesLoadedAction = paginationActions.loadPagesSucceeded({ pages })
        return of(
          pagesLoadedAction,
          LoadingBarActions.REMOVE_JOB()
        )
      }),
      catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
      startWith(LoadingBarActions.ADD_JOB()),
    ))
  ))



  /**
   * Epic for extending stream of entity previews when new entity previews are
   * successfully loaded into the store
   */
  extendEntityPreviewStream$ = createEffect(
    () => this.actions$.pipe(
      ofType(schemaModifierActions.succeeded),
      map(a => a.payload?.positive?.war?.entity_preview),
      filter(items => !!items?.length),
      concatLatestFrom(() => this.facade.ui.activeProject.projectId$),
      tap(([entityPreviews, pkProject]) => {
        this.entityPreviewSocket.emit('extendStream', {
          pkProject,
          pks: entityPreviews.map(p => p.project_id + '_' + p.pk_entity)
        })
      }),

    ),
    {
      dispatch: false,
    }
  )


  errorActions(error: HttpErrorResponse) {
    return [
      LoadingBarActions.REMOVE_JOB(),
      notificationActions.add({
        toast: {
          type: 'error',
          options: {
            title: error.name,
            msg: error.message
          }
        }
      })
    ]
  }

}

