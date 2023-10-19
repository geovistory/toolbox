import { GvFieldPage, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';

export interface LoadActionMeta { addPending: string, pk?: number }
export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };
export interface LoadByPkAndVersionActionMeta { addPending: string, pk?: number, pkEntity: number, version: number }

export interface ModifyActionMeta<Model> { items: Model[], addPending: string, pk?: number }
export interface SucceedActionMeta<Model> { items: Model[], removePending: string, pk?: number }
export interface FailActionMeta { removePending: string, pk?: number }

export interface PaginateByParam { [key: string]: number | boolean | string }
export interface LoadPageMeta { page: GvFieldPage, pk?: number }
export interface LoadPageSucceededMeta { statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number }


export interface ActionResultObservable<Model> { pending$: Observable<boolean>, resolved$: Observable<SucceedActionMeta<Model>>, key: string }

type Payload = null
export type FluxActionObservable<Payload, Meta> = Observable<FluxStandardAction<Payload, Meta>>


/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 */

export class CrudActionsFactory<Model> {


  constructor(
    public actionPrefix: string,
    public modelName: string
  ) {
  }

  loadAction(suffix: string = '', addPending: string, pk?: number) {
    const action: FluxStandardAction<Payload, LoadActionMeta> = {
      type: this.actionPrefix + '.' + this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
      meta: { addPending, pk },
      payload: null,
    };
    return action;
  }

  loadSucceededAction(items: Model[], removePending: string, pk?: number) {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    return action;
  }

  /**
   * Call the Redux Action to upsert model instances.
   */
  upsertAction(items: Partial<Model>[], addPending: string, pk?: number) {
    const action: FluxStandardAction<Payload, ModifyActionMeta<Partial<Model>>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::UPSERT',
      meta: { items, addPending, pk },
      payload: null
    })
    return action;
  }

  upsertSucceededAction(items: Model[], removePending: string, pk?: number) {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    return action;
  }

  /**
   * this action is not model specific but pendingKey specific.
   * Reducer will add whole meta part to the resolved key
   */
  succeededAction(items: Model[], removePending: string, pk?: number) {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: 'general::UPSERT_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    return action;
  }

  /**
  * Call the Redux Action to delete model instances.
  */
  deleteAction(items: Model[], addPending: string, pk?: number) {
    const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::DELETE',
      meta: { items, addPending, pk },
      payload: null
    })
    return action;
  }

  deleteSucceededAction(items: Model[], removePending: string, pk?: number): FluxStandardAction<Payload, SucceedActionMeta<Model>> {
    return {
      type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    }
  }

  failedAction(error, removePending: string, pk?: number) {
    const action: FluxStandardAction<Payload, FailActionMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::FAILED',
      meta: { removePending, pk },
      payload: null,
      error,
    })
    return action;
  }


  loadPageAction(page: GvFieldPage, pk?: number) {
    const action: FluxStandardAction<Payload, LoadPageMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
      meta: { page, pk },
      payload: null,
    })
    return action;
  }

  loadPageSucceededAction(statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number) {
    const action: FluxStandardAction<Payload, LoadPageSucceededMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
      meta: { page, statements, count, pk },
      payload: null,
    })
    return action;
  }

  loadPageFailedAction(page: GvFieldPage, pk?: number) {
    const action: FluxStandardAction<Payload, LoadPageMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
      meta: { page, pk },
      payload: null,
    })
    return action;
  }


}
