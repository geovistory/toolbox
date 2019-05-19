import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, U } from 'app/core';
import { Observable } from 'rxjs';

/**
 * A: Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are proced
 */
@Injectable()
export class StandardActionsFactory<Payload, Model> {

  load: (suffix?: string) => void;
  loadSucceeded: (items: Model[], removePending: string) => void;
  upsert: (items: Model[]) => Observable<boolean>;
  upsertSucceeded: (items: Model[], removePending: string) => void;
  delete: (items: Model[]) => Observable<boolean>;
  deleteSucceeded: (items: Model[], removePending: string) => void;
  failed: (error, removePending: string) => void;

  actionPrefix: string;
  modelName: string;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  createCrudActions(actionPrefix: string, modelName: string) {
    this.actionPrefix = actionPrefix;
    this.modelName = modelName;

    this.load = (suffix: string = '') => {
      const action: FluxStandardAction<Payload, { addPending: string }> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
        meta: { addPending: U.uuid() },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }

    this.loadSucceeded = (items: Model[], removePending: string) => {
      const action: FluxStandardAction<Payload, { items: Model[], removePending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
        meta: { items, removePending },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }

    /**
     * Call the Redux Action to upsert model instances.
     */
    this.upsert = (items: Model[]) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, { items: Model[], addPending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::UPSERT',
        meta: { items, addPending },
        payload: null
      })
      this.ngRedux.dispatch(action)
      return this.ngRedux.select(['pending', addPending]);
    }

    this.upsertSucceeded = (items: Model[], removePending: string) => {
      const action: FluxStandardAction<Payload, { items: Model[], removePending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
        meta: { items, removePending },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }

    /**
    * Call the Redux Action to delete model instances.
    */
    this.delete = (items: Model[]) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, { items: Model[], addPending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::DELETE',
        meta: { items, addPending },
        payload: null
      })
      this.ngRedux.dispatch(action)
      return this.ngRedux.select(['pending', addPending]);
    }

    this.deleteSucceeded = (items: Model[], removePending: string) => {
      const action: FluxStandardAction<Payload, { items: Model[], removePending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
        meta: { items, removePending },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }



    this.failed = (error, removePending: string) => {
      const action: FluxStandardAction<Payload, { items: Model[], removePending: string }> = ({
        type: this.actionPrefix + '.' + this.modelName + '::FAILED',
        meta: null,
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
