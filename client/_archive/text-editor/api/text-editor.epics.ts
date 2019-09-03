import { Injectable } from '@angular/core';
import { DatDigital, DatDigitalApi, InfEntityAssociation, InfEntityAssociationApi, ProInfoProjRelApi, LoadingBarActions } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ofSubstore } from 'app/core/store/module';
import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { TextEditorComponent } from '../text-editor.component';
import { TextEditorAPIAction, TextEditorAPIActions } from './text-editor.actions';

@Injectable()
export class TextEditorAPIEpics {
  constructor(
    private eaApi: InfEntityAssociationApi,
    private digitObjApi: DatDigitalApi,
    private eprApi: ProInfoProjRelApi,
    private actions: TextEditorAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TextEditorComponent): Epic {
    return combineEpics(
      this.createLoadTextEditorEpic(c),
      this.createSaveTextEditorEpic(c),
      this.createRelateToSectionEpic(c),
      // this.createGetVersionListEpic(c),
      this.createChangeVersionEpic(c),
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
          this.eaApi.nestedObject(true, action.meta.pkProject, null, action.meta.fkRangeEntity, null, DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION)
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


        //   this.digitObjApi.saveWithEpr(action.meta.digitalObject, action.meta.pkProject)
        //     /**
        //      * Subscribe to the api call
        //      */
        //     .subscribe((data: DatDigital[]) => {


        //       const dobj = data.length ? data[0] : undefined;
        //       /**
        //        * Emit the global action that completes the loading bar
        //        */
        //       globalStore.next(this.loadingBarActions.completeLoading());
        //       /**
        //        * Emit the local action on loading succeeded
        //        */
        //       c.localStore.dispatch(this.actions.saveSucceeded(dobj));

        //     }, error => {
        //       /**
        // * Emit the global action that shows some loading error message
        // */
        //       globalStore.next(this.loadingBarActions.completeLoading());
        //       globalStore.next(this.notificationActions.addToast({
        //         type: 'error',
        //         options: {
        //           title: error.message
        //         }
        //       }));
        //       /**
        //        * Emit the local action on loading failed
        //        */
        //       c.localStore.dispatch(this.actions.saveFailed({ status: '' + error.status }))
        //     })
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
            fk_info_domain: action.meta.digitalObject.pk_entity,
            fk_property: DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION,
            fk_info_range: c.pkSection
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

  // private createGetVersionListEpic(c: TextEditorComponent): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(TextEditorAPIActions.LOAD_SUCCEEDED, TextEditorAPIActions.SAVE_SUCCEEDED),
  //       filter(action => ofSubstore(c.basePath)(action)),
  //       // Let it pass, only if there is a digital object yet
  //       filter(() => ('pk_entity' in (c.localStore.getState().digitalObject || {}))),
  //       switchMap((action: TextEditorAPIAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         c.localStore.dispatch(this.actions.loadVersionList())

  //         /**
  //          * Do some api call
  //          */
  //         this.digitObjApi.getVersions(c.localStore.getState().digitalObject.pk_entity)
  //           /**
  //            * Subscribe to the api call
  //            */
  //           .subscribe((digitals: DatDigital[]) => {
  //             /**
  //              * Emit the global action that completes the loading bar
  //              */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             // map versions to IVersion[]
  //             const versionList = digitals.map(item => {
  //               return {
  //                 entityVersion: item.entity_version,
  //                 pkEntityVersionConcat: item.pk_text_version_concat,
  //                 pkEntity: item.pk_entity
  //               } as IVersion
  //             })
  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             c.localStore.dispatch(this.actions.loadVersionListSucceeded(versionList));

  //           }, error => {
  //             /**
  //       * Emit the global action that shows some loading error message
  //       */
  //             globalStore.next(this.loadingBarActions.completeLoading());
  //             globalStore.next(this.notificationActions.addToast({
  //               type: 'error',
  //               options: {
  //                 title: error.message
  //               }
  //             }));
  //             /**
  //              * Emit the local action on loading failed
  //              */
  //             c.localStore.dispatch(this.actions.loadVersionListFailed({ status: '' + error.status }))
  //           })
  //       })),
  //       takeUntil(c.destroy$)
  //     )
  //   }
  // }


  private createChangeVersionEpic(c: TextEditorComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TextEditorAPIActions.CHANGE_VERSION),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TextEditorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          const version = action.meta.version;

          /**
           * Do some api call
           */
          this.eprApi.updateEprAttributes(
            c.ngRedux.getState().activeProject.pk_project,
            version.pkEntity,
            {
              fk_entity_version: version.entityVersion,
              fk_entity_version_concat: version.pkEntityVersionConcat
            }
          )
            /**
             * Subscribe to the api call
             */
            .subscribe((digitObjects: DatDigital[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.changeVersionSucceeded());
              const s = c.localStore.getState()

              /**
              * Trigger the loading of the version
              */
              c.localStore.dispatch(this.actions.load(
                c.ngRedux.getState().activeProject.pk_project,
                s.entityAssociation.fk_info_range,
                s.entityAssociation.fk_property
              ));

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
              c.localStore.dispatch(this.actions.changeVersionFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}

