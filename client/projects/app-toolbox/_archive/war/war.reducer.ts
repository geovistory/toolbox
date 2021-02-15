import { ReducerFactory } from "@kleiolab/lib-redux";
import { warRoot, warDefinitions } from './war.config';




export function createWarReducer() {
  return new ReducerFactory(warRoot, warDefinitions).createReducers()
}


