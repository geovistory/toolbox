import { ReducerFactory } from '../_helpers/reducer-factory';
import { datDefinitions, datRoot } from '../reducer-configs/dat.config';

export function createDatReducer() {
  return new ReducerFactory(datRoot, datDefinitions).createReducers()
}
