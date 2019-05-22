import { Injectable } from '@angular/core';
import { StandardActionsFactory, LoadActionMeta } from 'app/core/store/actions';
import { InfPersistentItem } from '../sdk';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U } from 'app/core';
import { PersistentItemSlice } from './inf.models';
import { FluxStandardAction } from 'flux-standard-action';

type Payload = PersistentItemSlice;

export interface LoadByPkAction extends LoadActionMeta { pkEntity: number };

export class PeItActionFactory extends StandardActionsFactory<Payload, InfPersistentItem> {

  // Suffixes of load action types
  static readonly NESTED_BY_PK = 'NESTED_BY_PK';

  loadNestedObject: (pkProject:number, pkEntity: number) => void;
  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }
  createActions(): PeItActionFactory {
    Object.assign(this, this.createCrudActions('inf', 'persistent_item'))

    this.loadNestedObject = (pkProject:number, pkEntity: number) => {
      const action: FluxStandardAction<Payload, LoadByPkAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + PeItActionFactory.NESTED_BY_PK,
        meta: { addPending: U.uuid(), pk: pkProject, pkEntity },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }
    return this;
  }
}




@Injectable()
export class InfActions {

  persistent_item: PeItActionFactory;

  constructor(public ngRedux: NgRedux<IAppState>) {
    this.persistent_item = new PeItActionFactory(ngRedux).createActions();
  }

}
