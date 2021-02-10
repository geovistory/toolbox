import { ReducerFactory } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { infDefinitions, infRoot } from './inf.config';




export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


