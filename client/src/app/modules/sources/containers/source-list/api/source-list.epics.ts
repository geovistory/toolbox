import { Injectable } from '@angular/core';
import { ComConfig, InfEntityAssociation, InfEntityAssociationApi, InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarActions, ActiveAccountService } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SourceListComponent } from '../source-list.component';
import { SourceListAPIAction, SourceListAPIActions } from './source-list.actions';

@Injectable()
export class SourceListAPIEpics {
  constructor(
    private eprApi: InfEntityProjectRelApi,
    private eaApi: InfEntityAssociationApi,
    private peItService: PeItService, // <- change the api
    private actions: SourceListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: SourceListComponent): Epic {
    return combineEpics(
      this.createLoadSourceDetailsEpic(c),
      this.createLoadSectionDetailsEpic(c),
      this.createRemoveSourceEpic(c),
      this.createRemoveSectionEpic(c)
    );
  }

  private createLoadSourceDetailsEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.LOAD_SOURCE_DETAILS),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              const peItDetail = createPeItDetail({

                showMentionedEntities: true,
                showMentionedEntitiesToggle: true,

                showAssertions: false,
                showAssertionsToggle: false,

                showSectionList: true,
                showSectionListToggle: true,

                showProperties: true,
                showPropertiesToggle: true,

                showPropertiesHeader: true,
                // showAddAPropertyButton: false,

                mentionedEntities: {
                  mentioningListType: 'ofSource',
                  sourceEntityPk: action.meta.pkEntity
                }

              }, data, action.meta.crm,
                { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE })
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSourceDetailsSucceeded(peItDetail));

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
              c.localStore.dispatch(this.actions.loadSourceDetailsFailed());

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
  private createLoadSectionDetailsEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.LOAD_SECTION_DETAILS),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              const peItDetail = createPeItDetail({

                showProperties: false,
                showPropertiesToggle: true,
                // showAddAPropertyButton: false,

                showRepros: true,
                showReprosToggle: true,

                showMentionedEntities: true, // TODO change to false
                showMentionedEntitiesToggle: true,

                showAssertions: false,
                showAssertionsToggle: false,

                mentionedEntities: {
                  mentioningListType: 'ofSection',
                  sourceEntityPk: action.meta.pkSource,
                  sectionEntityPk: action.meta.pkEntity
                }

              }, data, action.meta.crm,
                { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE })
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSectionDetailsSucceeded(peItDetail));

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
              c.localStore.dispatch(this.actions.loadSectionDetailsFailed());

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


  /**
   * Epic to remove a peIt from project
   */
  private createRemoveSourceEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.REMOVE_SOURCE),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkEntity, {
            is_in_project: false
          } as InfEntityProjectRel)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {

              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.removeSourceSucceded());
              c.openSearchList()

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
              c.localStore.dispatch(this.actions.removeSourceFailed(error.message));

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  /**
   * Epic to remove a peIt from project
   */
  private createRemoveSectionEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.REMOVE_SECTION),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {

          const onErr = (error) => {
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
            c.localStore.dispatch(this.actions.removeSectionFailed(error.message));
          }

          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          const fkParentClass = c.ngRedux.getState().activeProject.dataUnitPreviews[c.activatedRoute.snapshot.params.pkEntity].fk_class;
          let fkDomain = null;
          let fkRange = null;
          let fkProperty = null;
          switch (fkParentClass) {

            case DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE:
              fkDomain = c.activatedRoute.snapshot.params.pkSection;
              fkProperty = DfhConfig.PROPERTY_PK_R4_CARRIERS_PROVIDED_BY;
              fkRange = c.activatedRoute.snapshot.params.pkEntity;
              break;

            case DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON:
              fkDomain = c.activatedRoute.snapshot.params.pkEntity;
              fkProperty = DfhConfig.PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR;
              fkRange = c.activatedRoute.snapshot.params.pkSection;
              break;

            default: console.warn('this class is not yet supportet')
              break;
          }

          // Find entityAssociation
          this.eaApi.queryByParams(false, null, null, fkRange, fkDomain, fkProperty).subscribe(
            (eas: InfEntityAssociation[]) => {

              const ea = eas[0];

              combineLatest(
                // remove section (peIt)
                this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkEntity, {
                  is_in_project: false
                } as InfEntityProjectRel),
                // remove entity association
                this.eprApi.updateEprAttributes(action.meta.pkProject, ea.pk_entity, {
                  is_in_project: false
                } as InfEntityProjectRel)
              ).subscribe(
                (data) => {

                  /**
                   * Emit the global action that completes the loading bar
                   */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  /**
                   * Emit the local action on loading succeeded
                   */
                  c.localStore.dispatch(this.actions.removeSectionSucceded());

                  c.router.navigate(['../../'], {
                    relativeTo: c.activatedRoute, queryParamsHandling: 'merge'
                  })
                },
                err => onErr(err)
              )

            }, err => onErr(err)
          )


        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
