import { ReducerFactory } from 'app/core/store/reducer-factory';
import { infDefinitions, infRoot } from './inf.config';




export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


