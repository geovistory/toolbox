import { ReducerFactory } from '../_helpers';
import { tabDefinitions, tabRoot } from './tab.config';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
