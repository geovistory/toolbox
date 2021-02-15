import { ReducerFactory } from "@kleiolab/lib-redux";
import { proDefinitions, proRoot } from './pro.config';




export function createProReducer() {
  return new ReducerFactory(proRoot, proDefinitions).createReducers()
}


