import { indexBy, prop, clone } from 'ramda';
import { Action } from 'redux';
import { QueryDetail } from './query-detail.models';
import { QueryDetailAPIAction, QueryDetailAPIActions } from './query-detail.actions';

const INITIAL_STATE = new QueryDetail();

export const getFullCount = (items): number => {
  if (!items.length) return 0;
  else return parseInt(items[0].full_count, 10)
}

export const  pageOfOffset = (offset, limit): number => {
  return Math.floor((offset / limit));
}

export const offsetOfPage = (page, limit): number  =>{
  return limit * page;
}

export function queryDetailReducer(state: QueryDetail = INITIAL_STATE, a: Action): QueryDetail {

  const action = a as QueryDetailAPIAction;

  switch (action.type) {
    case QueryDetailAPIActions.LOAD:
      state = {
        ...state,
        items: []
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
        items: []
      };
      break;

    /*****************************************************
    * Run
    *****************************************************/
    case QueryDetailAPIActions.RUN_INIT:
      state = {
        ...state,
        items: [],
        loadedPages: {},
        loadingPages: {},
        fullCount: 0
      };
      break;

    case QueryDetailAPIActions.RUN:
      state = {
        ...state,
        loadingPages: {
          ...state.loadingPages,
          [pageOfOffset(action.meta.query.offset, action.meta.query.limit)]: true
        }
      }
      break;


    case QueryDetailAPIActions.RUN_SUCCEEDED:

      const fullCount = getFullCount(action.meta.queryResults)
      let ghostItems = [];
      const pageNr = pageOfOffset(action.meta.offset, action.meta.limit);

      if (state.items.length !== fullCount) {
        // make sure, we have the right length of results
        for (let i = 0; i < fullCount; i++) {
          ghostItems.push({})
        }
        state = { ...state, loadedPages: {} }
      } else {
        ghostItems = clone(state.items);
      }

      if (action.meta.queryResults) {
        for (let i = 0; i < action.meta.queryResults.length; i++) {
          ghostItems[(i + action.meta.offset)] = action.meta.queryResults[i];
        }
      }

      state = {
        ...state,
        items: ghostItems,
        loadedPages: {
          ...state.loadedPages,
          [pageNr]: true
        },
        loadingPages: {
          ...state.loadingPages,
          [pageNr]: false
        },
        fullCount
      }

      break;

    case QueryDetailAPIActions.RUN_FAILED:
      state = {
        ...state,
        loadingPages: {
          ...state.loadingPages,
          [pageOfOffset(action.meta.offset, action.meta.limit)]: false
        }
      }

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

