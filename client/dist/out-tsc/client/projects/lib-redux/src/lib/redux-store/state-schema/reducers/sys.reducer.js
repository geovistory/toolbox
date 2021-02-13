import { sysDefinitions, sysRoot } from '../reducer-configs/sys.config';
import { ReducerFactory } from '../_helpers/reducer-factory';
export function createSysReducer() {
    return new ReducerFactory(sysRoot, sysDefinitions).createReducers();
}
//# sourceMappingURL=sys.reducer.js.map