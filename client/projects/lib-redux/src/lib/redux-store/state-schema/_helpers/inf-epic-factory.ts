import { ProInfoProjRel, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { pathOr } from 'ramda';
import { Action } from 'redux';
import { ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ProActions } from '../actions/pro.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActionFactory } from './inf-action-factory';
import { ModifyActionMeta } from './schema-actions-factory';
import { SchemaEpicsFactory } from './schema-epics-factory';

export class InfEpicsFactory<Payload, Model> extends SchemaEpicsFactory<Payload, Model> {
  constructor(
    public actionPrefix: string,
    public modelName: string,
    public actions: InfActionFactory<Payload, Model>,
    public notifications: NotificationsAPIActions,
    public infoProjRelApi: ProInfoProjRelApi,
    public proActions: ProActions
  ) {
    super(actionPrefix, modelName, actions, notifications)
  }

  /**
   * This upsert epic overrides the standard upsert.
   * In addition to the standard, it extends the items to upsert, so that
   * they are added to the project.
   */
  createUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, onSuccessHook?: (data: Model[], pk?) => void) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          const meta = action.meta as any;
          // add is_in_project true

          meta.items = meta.items.map(i => ({
            ...i, entity_version_project_rels: [{
              ...pathOr({}, ['entity_version_project_rels', 0], i),
              is_in_project: true,
            }]
          }))

          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk);
              this.actions.succeeded(data, pendingKey, action.meta.pk);
            }
            else {
              this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }

  /**
   * This epic maps the items to remove in minimalisic instances of
   * InfoProjRel, containing only the fk_entity and is_in_project=false.
   * The pk of the project, that removes the items, is transported in meta.pk.
   */
  createRemoveEpic() {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::REMOVE'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          this.infoProjRelApi.bulkUpdateEprAttributes(
            action.meta.pk,
            action.meta.items.map((item: any) => ({
              fk_entity: item.pk_entity,
              is_in_project: false
            }))
          )
            .subscribe((infoProjRels: ProInfoProjRel[]) => {
              if (infoProjRels.length) {
                this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk)
              }
              this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk)
            }, error => {
              globalActions.next(this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
              }));
              this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk)
            })
        }))

      )
    }
  }



  /**
   * This upsert epic overrides the standard upsert.
   * In addition to the standard, it extends the items to upsert, so that
   * they are added to the project.
   */
  createCustomUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string, onSuccessHook?: (data: Model[], pk?) => void) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any;
          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk);
              this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }

}