import { sysDefinitions, sysRoot } from '../reducer-configs';
import { ReducerFactory } from '../_helpers';
export function createSysReducer() {
  return new ReducerFactory(sysRoot, sysDefinitions).createReducers()
}
