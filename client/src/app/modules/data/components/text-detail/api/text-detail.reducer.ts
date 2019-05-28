import { Action } from 'redux';
import { TextDetailAPIAction, TextDetailAPIActions } from './text-detail.actions';
import { TextDetail } from './text-detail.models';

const INITIAL_STATE = new TextDetail();

export function textDetailReducer(state: TextDetail = INITIAL_STATE, a: Action): TextDetail {

  const action = a as TextDetailAPIAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case TextDetailAPIActions.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Set show right panel
    *****************************************************/
    case TextDetailAPIActions.SET_SHOW_RIGHT_AREA:
      state = {
        ...state,
        showRightArea: action.meta.showRightArea
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TextDetailAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

