import { ReducerFactory } from 'app/core/store/reducer-factory';
import { datDefinitions, datRoot } from './dat.config';




export function createDatReducer() {
  return new ReducerFactory(datRoot, datDefinitions).createReducers()
}

