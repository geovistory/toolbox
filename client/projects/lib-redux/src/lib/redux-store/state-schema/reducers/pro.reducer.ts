import { proDefinitions, proRoot } from '../reducer-configs/pro.config';
import { CrudReducerFactory } from '../_helpers/crud-reducer-factory';




export function createProReducer() {
  return new CrudReducerFactory(proRoot, proDefinitions).createReducers()
}


