import { ReducerFactory } from "@kleiolab/lib-redux";
import { sysDefinitions, sysRoot } from './sys.config';

export function createSysReducer() {
  return new ReducerFactory(sysRoot, sysDefinitions).createReducers()
}
