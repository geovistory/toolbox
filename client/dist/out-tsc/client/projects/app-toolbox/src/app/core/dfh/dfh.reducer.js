import { ReducerFactory } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { dfhDefinitions } from './dfh.config';
export function createDfhReducer() {
    return new ReducerFactory('dfh', dfhDefinitions).createReducers();
}
//# sourceMappingURL=dfh.reducer.js.map