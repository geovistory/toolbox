import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models';
import { ActionResultObservable, ModifyActionMeta, SchemaActionsFactory, SucceedActionMeta } from './schema-actions-factory';

@Injectable()
export class InfActionFactory<Payload, Model> extends SchemaActionsFactory<Payload, Model> {


  /**
   * @param pk is used for facetting
   */
  remove: (items: Model[], pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  removeSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux);
  }

  createInfActions(actionPrefix: string, modelName: string): InfActionFactory<Payload, Model> {
    this.createCrudActions(actionPrefix, modelName)

    /**
     * Call the Redux Action to remove model instances from project.
     */
    this.remove = (items: Model[], pk?: number) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
        type: this.actionPrefix + '.' + this.modelName + '::REMOVE',
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

    this.removeSucceeded = (items: Model[], removePending: string, pk?: number) => {
      const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
        type: this.actionPrefix + '.' + this.modelName + '::REMOVE_SUCCEEDED',
        meta: { items, removePending, pk },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }

    return this;
  }

}
