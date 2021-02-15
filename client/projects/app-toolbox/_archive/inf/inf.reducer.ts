import { ReducerFactory } from "@kleiolab/lib-redux";
import { infDefinitions, infRoot } from './inf.config';




export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


