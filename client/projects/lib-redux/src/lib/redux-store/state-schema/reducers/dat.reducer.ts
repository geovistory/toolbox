import { datDefinitions, datRoot } from '../reducer-configs/dat.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';

export function createDatReducer() {
  return new CrudReducerFactory(datRoot, datDefinitions).createReducers()
}
