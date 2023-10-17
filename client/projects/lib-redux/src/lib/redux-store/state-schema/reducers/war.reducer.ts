import { warDefinitions, warRoot } from '../reducer-configs/war.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';

export function createWarReducer() {
  return new CrudReducerFactory(warRoot, warDefinitions).createReducers()
}


