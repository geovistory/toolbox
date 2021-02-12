
import { ReducerFactory } from '../_helpers';
import { dfhDefinitions } from '../reducer-configs';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
