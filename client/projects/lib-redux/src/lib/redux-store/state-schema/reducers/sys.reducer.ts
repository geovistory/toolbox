import { ReducerFactory } from '../_helpers';
import { sysDefinitions, sysRoot } from './sys.config';

export function createSysReducer() {
  return new ReducerFactory(sysRoot, sysDefinitions).createReducers()
}
