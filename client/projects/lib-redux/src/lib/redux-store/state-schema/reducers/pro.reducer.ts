import { ReducerFactory } from '../_helpers';
import { proDefinitions, proRoot } from '../reducer-configs';




export function createProReducer() {
  return new ReducerFactory(proRoot, proDefinitions).createReducers()
}


