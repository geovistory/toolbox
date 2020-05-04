import { EntityDetail } from 'app/core';
import { Action } from 'redux';
import { EntityDetailAPIAction, EntityDetailAPIActions } from './entity-detail.actions';

const INITIAL_STATE = new EntityDetail();

export function entityDetailReducer(state: EntityDetail = INITIAL_STATE, a: Action): EntityDetail {

  const action = a as EntityDetailAPIAction;

  switch (action.type) {

    /*****************************************************
    * Reducers to manage entity editor
    *****************************************************/
    case EntityDetailAPIActions.INIT:
      state = {
        ...state,
        ...action.meta.config,
        // loading: false,
      };
      break;


    case EntityDetailAPIActions.DESTROY:
      state = {};
      break;

    case EntityDetailAPIActions.SET_SHOW_RIGHT_AREA:
      state = {
        ...state,
        showRightArea: action.payload.showRightArea
      }
      break;

    case EntityDetailAPIActions.SET_RIGHT_PANEL_ACTIVE_TAB:
      state = {
        ...state,
        rightPanelActiveTab: action.payload.rightPanelActiveTab
      }
      break;

    case EntityDetailAPIActions.TOGGLE_BOOLEAN:
      state = {
        ...state,
        [action.meta.keyToToggle]: !state[action.meta.keyToToggle]
      }
      break;

  }

  return state;
};

