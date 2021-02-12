
import { ReducerFactory } from '../_helpers';
import { dfhDefinitions } from './dfh.config';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
