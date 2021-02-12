import { ReducerFactory } from '../_helpers';
import { proDefinitions, proRoot } from './pro.config';




export function createProReducer() {
  return new ReducerFactory(proRoot, proDefinitions).createReducers()
}


