import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { PropertyList } from './property-list.models';
import { PropertyListAPIAction, PropertyListAPIActions } from './property-list.actions';
import { DfhProperty } from '../../../../../core';

const INITIAL_STATE = new PropertyList();

export const propertyKey = (prop: DfhProperty) => ('_' + prop.pk_entity);


export function propertyListReducer(state: PropertyList = INITIAL_STATE, a: Action): PropertyList {

  const action = a as PropertyListAPIAction;

  switch (action.type) {
    case PropertyListAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {}
      };
    case PropertyListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(propertyKey, action.meta.properties)
      };
    case PropertyListAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {}
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case PropertyListAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

