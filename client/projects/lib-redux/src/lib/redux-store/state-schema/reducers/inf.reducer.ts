import { ReducerFactory } from '../_helpers';
import { infDefinitions, infRoot } from '../reducer-configs';



export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


