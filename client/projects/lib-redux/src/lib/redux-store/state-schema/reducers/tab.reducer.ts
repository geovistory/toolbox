import { tabDefinitions, tabRoot } from '../reducer-configs/tab.config';
import { ReducerFactory } from '../_helpers/reducer-factory';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
