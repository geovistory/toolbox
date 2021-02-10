import { ReducerFactory } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { warRoot, warDefinitions } from './war.config';




export function createWarReducer() {
  return new ReducerFactory(warRoot, warDefinitions).createReducers()
}


