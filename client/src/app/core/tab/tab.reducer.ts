import { ReducerFactory } from 'app/core/store/reducer-factory';
import { tabDefinitions, tabRoot } from './tab.config';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
