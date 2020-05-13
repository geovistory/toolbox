import { ReducerFactory } from 'app/core/store/reducer-factory';
import { warRoot, warDefinitions } from './war.config';




export function createWarReducer() {
  return new ReducerFactory(warRoot, warDefinitions).createReducers()
}


