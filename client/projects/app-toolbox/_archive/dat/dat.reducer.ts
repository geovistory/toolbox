import { ReducerFactory } from "@kleiolab/lib-redux";
import { datDefinitions, datRoot } from './dat.config';

export function createDatReducer() {
  return new ReducerFactory(datRoot, datDefinitions).createReducers()
}
