
import { dfhDefinitions } from '../reducer-configs/dfh.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';

export function createDfhReducer() {
  return new CrudReducerFactory('dfh', dfhDefinitions).createReducers()
}
