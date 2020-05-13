import { ReducerFactory } from 'app/core/store/reducer-factory';
import { proDefinitions, proRoot } from './pro.config';




export function createProReducer() {
  return new ReducerFactory(proRoot, proDefinitions).createReducers()
}


