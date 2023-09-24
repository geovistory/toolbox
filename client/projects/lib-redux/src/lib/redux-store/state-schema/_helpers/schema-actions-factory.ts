import { NgRedux } from '@angular-redux/store';
import { GvFieldPage, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';

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

export class SchemaActionsFactory<Model> {


  constructor(
    public ngRedux: NgRedux<IAppState>,
    public actionPrefix: string,
    public modelName: string
  ) {
  }

  load(suffix: string = '', pk?: number): ActionResultObservable<Model> {
    const addPending = U.uuid()
    const action: FluxStandardAction<Payload, LoadActionMeta> = {
      type: this.actionPrefix + '.' + this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
      meta: { addPending, pk },
      payload: null,
    };
    this.ngRedux.dispatch(action)
    return {
      pending$: this.ngRedux.select<boolean>(['pending', addPending]),
      resolved$: this.ngRedux.select<SucceedActionMeta<Model>>(['resolved', addPending]),
      key: addPending
    };
  }

  loadSucceeded(items: Model[], removePending: string, pk?: number): void {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    this.ngRedux.dispatch(action)
  }

  /**
   * Call the Redux Action to upsert model instances.
   */
  upsert(items: Partial<Model>[], pk?: number): ActionResultObservable<Partial<Model>> {
    const addPending = U.uuid();
    const action: FluxStandardAction<Payload, ModifyActionMeta<Partial<Model>>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::UPSERT',
      meta: { items, addPending, pk },
      payload: null
    })
    this.ngRedux.dispatch(action)
    return {
      pending$: this.ngRedux.select<boolean>(['pending', addPending]),
      resolved$: this.ngRedux.select<SucceedActionMeta<Model>>(['resolved', addPending]),
      key: addPending
    };
  }

  upsertSucceeded(items: Model[], removePending: string, pk?: number): void {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    this.ngRedux.dispatch(action)
  }

  /**
   * this action is not model specific but pendingKey specific.
   * Reducer will add whole meta part to the resolved key
   */
  succeeded(items: Model[], removePending: string, pk?: number): void {
    const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
      type: 'general::UPSERT_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    })
    this.ngRedux.dispatch(action)
  }


  /**
  * Call the Redux Action to delete model instances.
  */
  delete(items: Model[], pk?: number): ActionResultObservable<Model> {
    const addPending = U.uuid();
    const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
      type: this.actionPrefix + '.' + this.modelName + '::DELETE',
      meta: { items, addPending, pk },
      payload: null
    })
    this.ngRedux.dispatch(action)
    return {
      pending$: this.ngRedux.select<boolean>(['pending', addPending]),
      resolved$: this.ngRedux.select<SucceedActionMeta<Model>>(['resolved', addPending]).pipe(filter(x => !!x)),
      key: addPending
    };
  }

  deleteSucceeded(items: Model[], removePending: string, pk?: number): void {
    this.ngRedux.dispatch(this.deleteSucceededAction(items, removePending, pk))
  }

  deleteSucceededAction(items: Model[], removePending: string, pk?: number): FluxStandardAction<Payload, SucceedActionMeta<Model>> {
    return {
      type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
      meta: { items, removePending, pk },
      payload: null
    }
  }

  failed(error, removePending: string, pk?: number): void {
    const action: FluxStandardAction<Payload, FailActionMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::FAILED',
      meta: { removePending, pk },
      payload: null,
      error,
    })
    this.ngRedux.dispatch(action)
  }


  loadPage(page: GvFieldPage, pk?: number): void {
    const action: FluxStandardAction<Payload, LoadPageMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
      meta: { page, pk },
      payload: null,
    })
    this.ngRedux.dispatch(action)
  }

  loadPageSucceeded(statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number): void {
    const action: FluxStandardAction<Payload, LoadPageSucceededMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
      meta: { page, statements, count, pk },
      payload: null,
    })
    this.ngRedux.dispatch(action)
  }

  loadPageSucceededAction(statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number) {
    return {
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
      meta: { page, statements, count, pk },
      payload: null,
    }
  }


  loadPageFailed(page: GvFieldPage, pk?: number): void {
    const action: FluxStandardAction<Payload, LoadPageMeta> = ({
      type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
      meta: { page, pk },
      payload: null,
    })
    this.ngRedux.dispatch(action)
  }


}

export interface SchemaObjectLoadActionMeta { removePending: string, pk?: number }
