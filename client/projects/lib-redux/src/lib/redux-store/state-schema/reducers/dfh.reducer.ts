
import { ReducerFactory } from '../_helpers/reducer-factory';
import { dfhDefinitions } from '../reducer-configs/dfh.config';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
