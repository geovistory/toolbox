import { ReducerFactory } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { datDefinitions, datRoot } from './dat.config';
export function createDatReducer() {
    return new ReducerFactory(datRoot, datDefinitions).createReducers();
}
//# sourceMappingURL=dat.reducer.js.map