import { Reducer, Action } from 'redux';
import { ProjectEntitiesComponent } from './project-entities.component';

export const testReducer: Reducer<number> = (state = 0, action: Action): number => {
  switch (action.type) {
    case ProjectEntitiesComponent.TEST_STORE: return state ++;
  }
  return state;
}

// Basic reducer logic.
export const projectEntitiesComponentReducer: Reducer<any> = (state: any = {}, action: Action): {} => ({
  ...state,
  pkEntity: testReducer(state.pkEntity, action),
});
