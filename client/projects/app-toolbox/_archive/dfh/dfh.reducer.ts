
import { ReducerFactory } from "@kleiolab/lib-redux";
import { dfhDefinitions } from './dfh.config';

export function createDfhReducer() {
  return new ReducerFactory('dfh', dfhDefinitions).createReducers()
}
