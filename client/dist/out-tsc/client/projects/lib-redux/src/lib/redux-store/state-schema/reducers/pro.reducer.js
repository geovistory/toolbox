import { ReducerFactory } from '../_helpers/reducer-factory';
import { proDefinitions, proRoot } from '../reducer-configs/pro.config';
export function createProReducer() {
    return new ReducerFactory(proRoot, proDefinitions).createReducers();
}
//# sourceMappingURL=pro.reducer.js.map