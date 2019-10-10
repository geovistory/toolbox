import { PeItDetail } from 'app/core';
import { Action } from 'redux';
import { PeItDetailAPIAction, PeItDetailAPIActions } from './pe-it-detail.actions';
import { peItReducer } from './pe-it.reducer';

const INITIAL_STATE = new PeItDetail();

export function peItDetailReducer(state: PeItDetail = INITIAL_STATE, a: Action): PeItDetail {

  const action = a as PeItDetailAPIAction;

  state = peItReducer(state, action);

  switch (action.type) {

    /*****************************************************
    * Reducers to manage entity editor
    *****************************************************/
    case PeItDetailAPIActions.INIT:
      state = {
        ...state,
        ...action.meta.config,
        loading: false,
      };
      break;

    // case PeItDetailAPIActions.LOAD_SUCCEEDED:
    //   state = {
    //     ...state,
    //     ...action.meta.peItDetail,
    //     loading: false,
    //   };
    //   break;

    // case PeItDetailAPIActions.LOAD_FAILED:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;



    /************************************************
     * Reducers to remove PeIt from project
     ************************************************/

    // case PeItDetailAPIActions.REMOVE_PE_IT:
    //   state = {
    //     ...state,
    //     loading: true
    //   }
    //   break;


    // case PeItDetailAPIActions.REMOVE_PE_IT_SUCCEEDED:
    //   state = {
    //     ...state,
    //     removed: true
    //   }
    //   break;


    // case PeItDetailAPIActions.REMOVE_PE_IT_FAILED:
    //   state = {
    //     ...state,
    //     loading: false
    //   }
    //   break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case PeItDetailAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

