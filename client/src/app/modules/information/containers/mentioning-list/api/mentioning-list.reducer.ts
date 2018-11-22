import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { MentioningList } from './mentioning-list.models';
import { MentioningListAPIAction, MentioningListAPIActions } from './mentioning-list.actions';

const INITIAL_STATE = new MentioningList();

export function mentioningListReducer(state: MentioningList = INITIAL_STATE, a: Action): MentioningList {

  const action = a as MentioningListAPIAction;

  switch (action.type) {


    /*****************************************************
    * Reducers to load list
    *****************************************************/

    case MentioningListAPIActions.LOAD:
      state = {
        ...state,
        loading: true,
        items: []
      };
      break;
    case MentioningListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        items: action.meta.items
      };
      break;

    case MentioningListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        loading: false,
        items: []
      };
      break;


    /*****************************************************
    * Reducers to create a new mentioning
    *****************************************************/
    case MentioningListAPIActions.CREATE:
      state = {
        ...state,
        loading: true
      };
      break;
    case MentioningListAPIActions.CREATE_SUCCEEDED:
      state = {
        ...state,
        items: [],
        loading: false,
        create: false
      };
      break;

    case MentioningListAPIActions.CREATE_FAILED:
      state = {
        ...state,
        items: [],
        loading: false
      };
      break;


    /*****************************************************
    * Reducers to manage entity add form
    *****************************************************/

    case MentioningListAPIActions.START_CREATE:
      state = {
        ...state,
        create: true
      };
      break;

    case MentioningListAPIActions.STOP_CREATE:
      state = {
        ...state,
        create: false
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case MentioningListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

