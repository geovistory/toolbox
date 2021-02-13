import { warDefinitions, warRoot } from '../reducer-configs/war.config';
import { ReducerFactory } from '../_helpers/reducer-factory';
export function createWarReducer() {
    return new ReducerFactory(warRoot, warDefinitions).createReducers();
}
//# sourceMappingURL=war.reducer.js.map