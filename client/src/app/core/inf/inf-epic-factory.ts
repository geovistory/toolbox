import { FluxStandardAction } from "flux-standard-action";
import { Action } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { NotificationsAPIActions } from "../notifications/components/api/notifications.actions";
import { ProInfoProjRelApi } from "../sdk";
import { ModifyActionMeta } from "../store/actions";
import { StandardEpicsFactory } from "../store/StandardEpicsFactory";
import { InfActionFactory } from "./inf-action-factory";

export class InfEpicsFactory<Payload, Model> extends StandardEpicsFactory<Payload, Model> {
  constructor(
    public actionPrefix: string,
    public modelName: string,
    public infActions: InfActionFactory<Payload, Model>,
    public notifications: NotificationsAPIActions,
    public infoProjRelApi: ProInfoProjRelApi
  ) {
    super(actionPrefix, modelName, infActions, notifications)
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
              is_in_project: true
            }]
          }))

          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk);
              this.infActions.upsertSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.infActions.upsertSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.infActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
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
            .subscribe(() => {
              this.infActions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk)
            }, error => {
              globalActions.next(this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
              }));
              this.infActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk)
            })
        }))

      )
    }
  }

}
