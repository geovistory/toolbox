import { clone, omit } from 'ramda';
import { Action } from 'redux';
import { LeafPeItViewAPIAction, LeafPeItViewAPIActions } from './leaf-pe-it-view.actions';
import { LeafPeItView } from './leaf-pe-it-view.models';

const INITIAL_STATE = new LeafPeItView();

export function leafPeItViewReducer(state: LeafPeItView = INITIAL_STATE, a: Action): LeafPeItView {

  const action = a as LeafPeItViewAPIAction;

  switch (action.type) {
    case LeafPeItViewAPIActions.LOAD:
      state = {
        ...state,
        _leaf_peIt_modal: {
          loading: true
        }
      };
      break;

    case LeafPeItViewAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        _leaf_peIt_modal: clone({
          ...action.meta.peItDetail,
          showRightPanel: false,
          loading: false
        })
      };
      break;

    case LeafPeItViewAPIActions.LOAD_FAILED:
      state = {
        ...state,
        _leaf_peIt_modal: {
          ...state._leaf_peIt_modal,
          loading: false,
        },
        error: 'error'
      };
      break;

    case LeafPeItViewAPIActions.SET_PK_ENTITY:
      state = {
        ...state,
        pkEntity: action.meta.pkEntity
      };
      break;

    case LeafPeItViewAPIActions.OPEN_SELECT_OR_CREATE_MODAL:
      state = {
        ...state,
        selectOrCreate: action.meta.selectOrCreate
      };
      break;

    case LeafPeItViewAPIActions.CLOSE_SELECT_OR_CREATE_MODAL:
      state = omit(['selectOrCreate'], state);
      break;


    case LeafPeItViewAPIActions.REMOVE:
      state = {}
      break;

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case LeafPeItViewAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};
