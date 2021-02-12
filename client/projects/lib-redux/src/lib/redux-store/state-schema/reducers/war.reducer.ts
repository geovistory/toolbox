import { ReducerFactory } from '../_helpers';
import { warRoot, warDefinitions } from './war.config';




export function createWarReducer() {
  return new ReducerFactory(warRoot, warDefinitions).createReducers()
}


