import { tabDefinitions, tabRoot } from '../reducer-configs/tab.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';

export function createTabReducer() {
  return new CrudReducerFactory(tabRoot, tabDefinitions).createReducers()
}
