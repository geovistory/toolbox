import { Injectable } from '@angular/core';
import { ComConfig, InfEntityAssociation, InfEntityAssociationApi, InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarActions, ActiveAccountService, ActiveProjectService } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { SectionDetailComponent } from '../section-detail.component';
import { SectionDetailAPIAction, SectionDetailAPIActions } from './section-detail.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class SectionDetailAPIEpics {
  constructor(
    private eprApi: InfEntityProjectRelApi,
    private eaApi: InfEntityAssociationApi,
    private peItService: PeItService, // <- change the api
    private actions: SectionDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions,
    private p: ActiveProjectService
  ) { }

  public createEpics(c: SectionDetailComponent): Epic {
    return combineEpics(

      this.createLoadSourcePreviewEpic(c),
      this.createLoadSectionDetailsEpic(c),
      this.createRemoveSectionEpic(c),

    );
  }
  private createLoadSourcePreviewEpic(c: SectionDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SectionDetailAPIActions.LOAD_SOURCE_PREVIEW),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SectionDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

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


          // Find associated source
          combineLatest(
            this.eaApi.queryByParams(
              false,
              action.meta.pkProject,
              null,
              action.meta.pkSection,
              null,
              DfhConfig.PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR
              ),
              this.eaApi.queryByParams(
                false,
                action.meta.pkProject,
                null,
                null,
                action.meta.pkSection,
                DfhConfig.PROPERTY_PK_R4_CARRIERS_PROVIDED_BY
            )
          )
            .subscribe((eass: InfEntityAssociation[][]) => {
              const sourceDomainEa = eass[0].length > 0 ? eass[0][0] : undefined;
              const sourceRangeEa = eass[1].length > 0 ? eass[1][0] : undefined;
              const pkSource = sourceDomainEa ? sourceDomainEa.fk_domain_entity : sourceRangeEa.fk_range_entity;


              this.p.streamEntityPreview(pkSource).subscribe(
                (data) => {

                  /**
                   * Emit the global action that completes the loading bar
                   */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  /**
                   * Emit the local action on loading succeeded
                   */
                  c.localStore.dispatch(this.actions.loadSourcePreviewSucceeded(data));

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

  private createLoadSectionDetailsEpic(c: SectionDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SectionDetailAPIActions.LOAD_SECTION_DETAILS),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SectionDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkSection, action.meta.pkProject)
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
                  sectionEntityPk: action.meta.pkSection,
                  sourceEntityPk: action.meta.pkSource
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
  private createRemoveSectionEpic(c: SectionDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SectionDetailAPIActions.REMOVE_SECTION),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SectionDetailAPIAction) => new Observable<Action>((globalStore) => {

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

          let fkDomain = null;
          let fkRange = null;
          let fkProperty = null;
          switch (action.meta.pkSourceClass) {

            case DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE:
              fkDomain = action.meta.pkSection;
              fkProperty = DfhConfig.PROPERTY_PK_R4_CARRIERS_PROVIDED_BY;
              fkRange = action.meta.pkSource;
              break;

            case DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON:
              fkDomain = action.meta.pkSource;
              fkProperty = DfhConfig.PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR;
              fkRange = action.meta.pkSection;
              break;

            default: console.warn('this class is not yet supported')
              break;
          }

          // Find entityAssociation
          this.eaApi.queryByParams(true, action.meta.pkProject, null, fkRange, fkDomain, fkProperty).subscribe(
            (eas: InfEntityAssociation[]) => {

              const ea = eas[0];

              combineLatest(
                // remove section (peIt)
                this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkSection, {
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
