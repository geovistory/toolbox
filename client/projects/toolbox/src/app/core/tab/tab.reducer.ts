import { ReducerFactory } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { tabDefinitions, tabRoot } from './tab.config';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
