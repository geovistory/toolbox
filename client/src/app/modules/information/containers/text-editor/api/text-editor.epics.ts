import { Injectable } from '@angular/core';
import { LoadingBarActions, InfEntityAssociationApi, InfEntityAssociation, InfDigitalObject, InfDigitalObjectApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TextEditorComponent } from '../text-editor.component';
import { TextEditorAPIActions, TextEditorAPIAction } from './text-editor.actions';
import { ofSubstore } from 'app/core/store/module';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';

@Injectable()
export class TextEditorAPIEpics {
  constructor(
    private eaApi: InfEntityAssociationApi,
    private digitObjApi: InfDigitalObjectApi,
    private actions: TextEditorAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TextEditorComponent): Epic {
    return combineEpics(
      this.createLoadTextEditorEpic(c),
      this.createSaveTextEditorEpic(c),
      this.createRelateToSectionEpic(c)
    );
  }

  private createLoadTextEditorEpic(c: TextEditorComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TextEditorAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TextEditorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eaApi.nestedObjectOfProject(action.meta.pkProject, null, action.meta.fkRangeEntity, null, DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfEntityAssociation[]) => {
              const ea = data.length ? data[0] : undefined;
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(ea));

            }, error => {
              /**
        * Emit the global action that shows some loading error message
        */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


  private createSaveTextEditorEpic(c: TextEditorComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TextEditorAPIActions.SAVE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TextEditorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          /**
           * Do some api call
           */


          this.digitObjApi.saveWithEpr(action.meta.digitalObject, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfDigitalObject[]) => {


              const dobj = data.length ? data[0] : undefined;
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.saveSucceeded(dobj));

            }, error => {
              /**
        * Emit the global action that shows some loading error message
        */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              c.localStore.dispatch(this.actions.saveFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  // if this is the first time, the digital object is created, an entity association is needed
  private createRelateToSectionEpic(c: TextEditorComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TextEditorAPIActions.SAVE_SUCCEEDED),
        filter(action => ofSubstore(c.basePath)(action)),
        // Let it pass, only if there is no ea yet
        filter(() => (!c.localStore.getState().entityAssociation)),
        switchMap((action: TextEditorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          c.localStore.dispatch(this.actions.createEntityAssociation())

          /**
           * Do some api call
           */


          this.eaApi.findOrCreateInfEntityAssociation(c.ngRedux.getState().activeProject.pk_project, new InfEntityAssociation({
            fk_domain_entity: action.meta.digitalObject.pk_entity,
            fk_property: DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION,
            fk_range_entity: c.pkSection
          }))
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {

              const ea = data.length ? data[0] : undefined;
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.createEntityAssociationSucceeded(ea));

            }, error => {
              /**
        * Emit the global action that shows some loading error message
        */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              c.localStore.dispatch(this.actions.createEntityAssociationFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
