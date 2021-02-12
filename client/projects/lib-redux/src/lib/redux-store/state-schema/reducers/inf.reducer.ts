import { ReducerFactory } from '../_helpers';
import { infDefinitions, infRoot } from './inf.config';




export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


