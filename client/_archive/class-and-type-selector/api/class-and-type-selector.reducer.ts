import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ClassAndTypeSelector } from './class-and-type-selector.models';
import { ClassAndTypeSelectorAPIAction, ClassAndTypeSelectorAPIActions } from './class-and-type-selector.actions';

const INITIAL_STATE = new ClassAndTypeSelector();

export function classAndTypeSelectorReducer(state: ClassAndTypeSelector = INITIAL_STATE, a: Action): ClassAndTypeSelector {

  const action = a as ClassAndTypeSelectorAPIAction;

  switch (action.type) {
    case ClassAndTypeSelectorAPIActions.LOAD:
      state = {
        ...state,
        loading: true,
        items: []
      };
      break;
    case ClassAndTypeSelectorAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        items: action.meta.items
      };
      break;

    case ClassAndTypeSelectorAPIActions.LOAD_FAILED:
      state = {
        ...state,
        loading: false,
        items: []
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ClassAndTypeSelectorAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

