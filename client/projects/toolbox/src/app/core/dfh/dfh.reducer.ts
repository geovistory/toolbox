
import { ReducerFactory } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { dfhDefinitions } from './dfh.config';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
