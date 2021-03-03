import { Injectable } from '@angular/core';
import { PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { Action } from 'redux';
import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { GvPaginationObjectAction, GvSchemaActions, GvSchemaObjectAction } from '../actions/schema.actions';
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
    private pag: PaginatedStatementsControllerService

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
        mergeMap((action: GvSchemaObjectAction) => new Observable<Action>((actionEmitter) => {
          actionEmitter.next(this.loadingBarActions.startLoading());
          action.payload.subscribe((data) => {
            this.schemaObjectService.storeSchemaObjectGv(data, 0)
            actionEmitter.next(this.loadingBarActions.completeLoading());
          }, error => {
            actionEmitter.next(this.notificationActions.addToast({
              type: 'error',
              options: { title: error }
            }))
          })
        }))
      ),
      /**
      * Epic for loading GvPaginationObjects
      * - it subscribes to the given observable (payload), which usually triggers a REST API call
      * - on success it stores the GvPaginationObject
      * - else it toasts an error message
      */
      (action$, store: StateObservable<IAppState>) => action$.pipe(
        ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD),
        mergeMap((action: GvPaginationObjectAction) => new Observable<Action>((actionEmitter) => {
          actionEmitter.next(this.loadingBarActions.startLoading());

          const pkProject = store.value.activeProject.pk_project;
          const meta = action.meta;

          // call action to set pagination loading on true
          this.infActions.statement.loadPage(meta.req.page, pkProject);

          this.pag.paginatedStatementsControllerLoadSubfieldPage(action.meta.req)
            .subscribe((data) => {
              // call action to store records
              this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
              // call action to store page informations
              for (const subfieldPage of data.subfieldPages) {
                this.infActions.statement.loadPageSucceeded(subfieldPage.paginatedStatements, subfieldPage.count, subfieldPage.page, pkProject);
              }
              // call action to complete loading bar
              actionEmitter.next(this.loadingBarActions.completeLoading());
            }, error => {
              actionEmitter.next(this.notificationActions.addToast({
                type: 'error',
                options: { title: error }
              }))
            })
        }))
      )
    )
  }
}

