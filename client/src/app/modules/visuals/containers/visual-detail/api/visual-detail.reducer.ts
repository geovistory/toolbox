import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { VisualDetail } from './visual-detail.models';
import { VisualDetailAPIAction, VisualDetailAPIActions } from './visual-detail.actions';

const INITIAL_STATE = new VisualDetail();

export function visualDetailReducer(state: VisualDetail = INITIAL_STATE, a: Action): VisualDetail {

  const action = a as VisualDetailAPIAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case VisualDetailAPIActions.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Load existing visual
    *****************************************************/
    case VisualDetailAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case VisualDetailAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case VisualDetailAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;

    /*****************************************************
    * Layout
    *****************************************************/
    case VisualDetailAPIActions.SHOW_RIGHT_AREA:
      state = { ...state, showRightArea: true };
      break;
    case VisualDetailAPIActions.HIDE_RIGHT_AREA:
      state = { ...state, showRightArea: false };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case VisualDetailAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

