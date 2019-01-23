import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ClassFieldList } from './class-field-list.models';
import { ClassFieldListAPIAction, ClassFieldListAPIActions } from './class-field-list.actions';

const INITIAL_STATE = new ClassFieldList();

export const pkEntityKey = (item) => ('_' + item.pk_entity);

export function classFieldListReducer(state: ClassFieldList = INITIAL_STATE, a: Action): ClassFieldList {

  const action = a as ClassFieldListAPIAction;

  switch (action.type) {
    case ClassFieldListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case ClassFieldListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(pkEntityKey, action.meta.itemsArray)
      };
      break;

    case ClassFieldListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ClassFieldListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

