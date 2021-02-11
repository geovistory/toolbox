import { ReducerFactory } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { proDefinitions, proRoot } from './pro.config';




export function createProReducer() {
  return new ReducerFactory(proRoot, proDefinitions).createReducers()
}


