import { sysDefinitions, sysRoot } from '../reducer-configs/sys.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';
export function createSysReducer() {
  return new CrudReducerFactory(sysRoot, sysDefinitions).createReducers()
}
