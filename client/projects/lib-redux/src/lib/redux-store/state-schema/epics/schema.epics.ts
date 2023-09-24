import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { GvPaginationObjectAction, GvSchemaActions, GvSchemaModifierAction, GvSchemaObjectAction } from '../actions/schema.actions';
import { SchemaService } from '../services/schema.service';

@Injectable({
  providedIn: 'root'
})
export class SchemaEpics {
  constructor(
    private schemaObjectService: SchemaService,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions,
    public infActions: InfActions,

  ) { }

  public createEpics(): Epic {

    return combineEpics(
      /**
       * Epic for loading GvSchemaObjects
       * - it subscribes to the given observable (payload), which usually triggers a REST API call
       * - on success it stores the GvSchemaObject
       * - else it toasts an error message
       */
      (action$, store) => action$.pipe(
        ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD),
        mergeMap((action: GvSchemaObjectAction) => action.payload.pipe(
          mergeMap(data => of(
            this.schemaObjectService.getStoreSchemaObjectGvAction(data),
            this.loadingBarActions.removeJobAction
          )),
          catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
          startWith(this.loadingBarActions.addJobAction),
        ))
      ),
      /**
       * Epic for loading GvSchemaModifiers
       * - it subscribes to the given observable (payload), which usually triggers a REST API call
       * - on success it stores the GvSchemaObject
       * - else it toasts an error message
       */
      (action$, store) => action$.pipe(
        ofType(GvSchemaActions.GV_SCHEMA_MODIFIER_LOAD),
        mergeMap((action: GvSchemaModifierAction) => action.payload.pipe(
          mergeMap(data => of(
            this.schemaObjectService.getStoreSchemaObjectGvAction(data.positive),
            ...this.schemaObjectService.getDeleteSchemaObjectGvActions(data.negative, 0),
            this.loadingBarActions.removeJobAction
          )),
          catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
          startWith(this.loadingBarActions.addJobAction),
        ))
      ),

      /**
      * Epic for loading GvPaginationObjects
      * - it subscribes to the given observable (payload), which usually triggers a REST API call
      * - on success it stores the GvPaginationObject
      * - else it toasts an error message
      */
      (action$, store: StateObservable<IAppState>) => action$.pipe(
        ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD),
        mergeMap((action: GvPaginationObjectAction) => action.payload.pipe(
          mergeMap(data => {
            const pageLoadedActions = data.subfieldPages.map(p => this.infActions.statement.loadPageSucceededAction(
              p.paginatedStatements, p.count, p.req.page, store.value.activeProject.pk_project
            ))
            return of(
              ...pageLoadedActions,
              this.loadingBarActions.removeJobAction
            )
          }),
          catchError((error: HttpErrorResponse) => of(...this.errorActions(error))),
          startWith(this.loadingBarActions.addJobAction),
        ))
      )
    )
  }

  errorActions(error: HttpErrorResponse) {
    return [
      this.loadingBarActions.removeJob(),
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

