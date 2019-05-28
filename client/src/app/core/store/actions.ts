import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, U } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';

export interface LoadActionMeta { addPending: string, pk?: number }
export interface ModifyActionMeta<Model> { items: Model[], addPending: string, pk?: number }
export interface SucceedActionMeta<Model> { items: Model[], removePending: string, pk?: number }
export interface FailActionMeta { removePending: string, pk?: number }

export interface ActionResultObservable<Model> { pending$: Observable<boolean>, resolved$: Observable<SucceedActionMeta<Model>>, key: string }

/**
 * A: Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are proced
 */
@Injectable()
export class StandardActionsFactory<Payload, Model> {

  load: (suffix?: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  loadSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  upsert: (items: Model[], pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  upsertSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  delete: (items: Model[], pk?: number) => Observable<boolean>;

  /**
   * @param pk is used for facetting
   */
  deleteSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  /**
   * @param pk is used for facetting
   */
  failed: (error, removePending: string, pk?: number) => void;

  actionPrefix: string;
  modelName: string;

  constructor(public ngRedux: NgRedux<IAppState>) {
  }


  createCrudActions(actionPrefix: string, modelName: string): StandardActionsFactory<Payload, Model> {
    this.actionPrefix = actionPrefix;
    this.modelName = modelName;

    this.load = (suffix: string = '', pk?: number) => {
      const addPending=  U.uuid()
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
      return this.ngRedux.select(['pending', addPending]);
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

    return this;
  }

}

/**
 * This class combines all the actions that are considered
 * to be root actions.
 *
 * Root actions are actions executed on the root slice of
 * the store (IAppState).
 *
 * This class is usefull to call rootActions from Components
 * and Epics that are connected to a substore and that do not
 * know the RootActions per se.
 */

export class RootActions extends LoadingBarActions {

}
