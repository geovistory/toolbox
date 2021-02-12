import { tabDefinitions, tabRoot } from '../reducer-configs';
import { ReducerFactory } from '../_helpers';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
