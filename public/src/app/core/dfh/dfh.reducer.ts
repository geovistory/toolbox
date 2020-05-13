
import { ReducerFactory } from 'app/core/store/reducer-factory';
import { dfhDefinitions } from './dfh.config';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
