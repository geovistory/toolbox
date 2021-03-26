import { ReducerFactory } from '../_helpers/reducer-factory';
import { infDefinitions, infRoot } from '../reducer-configs/inf.config';



export function createInfReducer() {
  return new ReducerFactory(infRoot, infDefinitions).createReducers()
}


