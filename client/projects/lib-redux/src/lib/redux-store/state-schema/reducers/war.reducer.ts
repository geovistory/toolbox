import { warDefinitions, warRoot } from '../reducer-configs';
import { ReducerFactory } from '../_helpers';

export function createWarReducer() {
  return new ReducerFactory(warRoot, warDefinitions).createReducers()
}


