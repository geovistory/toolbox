import { ReducerFactory } from '../redux-store/reducer-factory';
import { sysDefinitions, sysRoot } from './sys.config';

export function createSysReducer() {
  return new ReducerFactory(sysRoot, sysDefinitions).createReducers()
}
