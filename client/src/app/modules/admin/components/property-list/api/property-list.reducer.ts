import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { PropertyList } from './property-list.models';
import { PropertyListAPIAction, PropertyListAPIActions } from './property-list.actions';

const INITIAL_STATE = new PropertyList();

export function propertyListReducer(state: PropertyList = INITIAL_STATE, a: Action): PropertyList {

  const action = a as PropertyListAPIAction;

  switch (action.type) {
    case PropertyListAPIActions.LOAD_STARTED:
      return {
        ...state,
        propertys: []
      };
    case PropertyListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        propertys: action.payload.propertys
      };
    case PropertyListAPIActions.LOAD_FAILED:
      return {
        ...state,
        propertys: []
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case PropertyListAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

