import { NgRedux } from '@angular-redux/store';
import { GvFieldPage } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { ActionsObservable } from 'redux-observable-es6-compat';
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
export interface LoadPageSucceededMeta { pks: number[], count: number, page: GvFieldPage, pk?: number }



export interface ActionResultObservable<Model> { pending$: Observable<boolean>, resolved$: Observable<SucceedActionMeta<Model>>, key: string }

export type FluxActionObservable<Payload, Meta> = ActionsObservable<FluxStandardAction<Payload, Meta>>



/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 */

export class SchemaActionsFactory<Payload, Model> {

  load: (suffix?: string, pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  loadSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  upsert: (items: Partial<Model>[], pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  upsertSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  delete: (items: Model[], pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  deleteSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  failed: (error, removePending: string, pk?: number) => void;


  /**
   * @param pk is used for facetting
   */
  loadPage: (page: GvFieldPage, pk?: number) => void;

  /**
 * @param pk is used for facetting
 */
  loadPageSucceeded: (pks: number[], count: number, page: GvFieldPage, pk?: number) => void;
  loadPageFailed: (page: GvFieldPage, pk?: number) => void;

  /**
   * this action is not model specific but pendingKey specific.
   * Reducer will add whole meta part to the resolved key.
   */
  succeeded: (items: Model[], removePending: string, pk?: number) => void;

  actionPrefix: string;
  modelName: string;

  constructor(public ngRedux: NgRedux<IAppState>) {
  }


  createCrudActions(actionPrefix: string, modelName: string): SchemaActionsFactory<Payload, Model> {
    this.actionPrefix = actionPrefix;
    this.modelName = modelName;

    this.load = (suffix: string = '', pk?: number) => {
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

    this.loadSucceeded = (items: Model[], removePending: string, pk?: number) => {
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
    this.upsert = (items: Model[], pk?: number) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
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

    this.upsertSucceeded = (items: Model[], removePending: string, pk?: number) => {
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
    this.succeeded = (items: Model[], removePending: string, pk?: number) => {
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
    this.delete = (items: Model[], pk?: number) => {
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

    this.deleteSucceeded = (items: Model[], removePending: string, pk?: number) => {
      const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
        type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
        meta: { items, removePending, pk },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }



    this.failed = (error, removePending: string, pk?: number) => {
      const action: FluxStandardAction<Payload, FailActionMeta> = ({
        type: this.actionPrefix + '.' + this.modelName + '::FAILED',
        meta: { removePending, pk },
        payload: null,
        error,
      })
      this.ngRedux.dispatch(action)
    }


    this.loadPage = (page: GvFieldPage, pk?: number) => {
      const action: FluxStandardAction<Payload, LoadPageMeta> = ({
        type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
        meta: { page, pk },
        payload: null,
      })
      this.ngRedux.dispatch(action)
    }

    this.loadPageSucceeded = (pks: number[], count: number, page: GvFieldPage, pk?: number) => {
      const action: FluxStandardAction<Payload, LoadPageSucceededMeta> = ({
        type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
        meta: { page, pks, count, pk },
        payload: null,
      })
      this.ngRedux.dispatch(action)
    }

    this.loadPageFailed = (page: GvFieldPage, pk?: number) => {
      const action: FluxStandardAction<Payload, LoadPageMeta> = ({
        type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
        meta: { page, pk },
        payload: null,
      })
      this.ngRedux.dispatch(action)
    }

    return this;
  }

}

export interface SchemaObjectLoadActionMeta { removePending: string, pk?: number }