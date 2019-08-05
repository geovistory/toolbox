import { omit } from 'ramda';
import { Action } from 'redux';
import { TeEntDetail } from 'app/core';
import { TeEntDetailAPIAction, TeEntDetailAPIActions } from './te-ent-detail.actions';
import { teEntReducer } from '../../../entity/te-ent/te-ent.reducer';

const INITIAL_STATE = new TeEntDetail();

export function teEntDetailReducer(state: TeEntDetail = INITIAL_STATE, a: Action): TeEntDetail {

  state = teEntReducer(state, a);
  const action = a as TeEntDetailAPIAction;


  switch (action.type) {



    /*****************************************************
    * Reducers to manage temporal entity editor
    *****************************************************/
    case TeEntDetailAPIActions.LOAD:
      state = {
        loading: true
      };
      break;

      case TeEntDetailAPIActions.LOAD_SUCCEEDED:
        state = {
          ...state,
          ...action.meta.teEntDetail,
          loading: false,
        };
        break;

      case TeEntDetailAPIActions.LOAD_FAILED:
        state = {
          ...state,
          loading: false,
        };
        break;

      /************************************************
     * Reducer to toggle booleans.
     * Useful to toggle visibiility of ui elements
     ************************************************/

    case TeEntDetailAPIActions.TOGGLE_BOOLEAN:
      state = {
        ...state,
        [action.meta.keyToToggle]: !state[action.meta.keyToToggle]
      }
      break;

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TeEntDetailAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

