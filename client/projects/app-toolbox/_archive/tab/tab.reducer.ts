import { ReducerFactory } from "@kleiolab/lib-redux";
import { tabDefinitions, tabRoot } from './tab.config';

export function createTabReducer() {
  return new ReducerFactory(tabRoot, tabDefinitions).createReducers()
}
