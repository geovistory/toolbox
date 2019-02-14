import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { QueryDetail } from './query-detail.models';
import { QueryDetailAPIAction, QueryDetailAPIActions } from './query-detail.actions';

const INITIAL_STATE = new QueryDetail();

export function queryDetailReducer(state: QueryDetail = INITIAL_STATE, a: Action): QueryDetail {

  const action = a as QueryDetailAPIAction;

  switch (action.type) {
    case QueryDetailAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case QueryDetailAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: action.meta.queryResults
      };
      break;

    case QueryDetailAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;

    /*****************************************************
    * Run
    *****************************************************/
    case QueryDetailAPIActions.RUN_SUCCEEDED:
      state = {
        ...state,
        items: action.meta.queryResults
      };
      break;

    /*****************************************************
    * Layout
    *****************************************************/
    case QueryDetailAPIActions.SHOW_RIGHT_AREA:
      state = { ...state, showRightArea: true };
      break;
    case QueryDetailAPIActions.HIDE_RIGHT_AREA:
      state = { ...state, showRightArea: false };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case QueryDetailAPIActions.DESTROY:
      state = null;
      break;

  }

  return state;
};

