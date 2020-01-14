import { Action } from 'redux';
import { TabBase } from './tab-layout.models';
import { TabBaseAPIAction, TabLayout } from './tab-layout';

const INITIAL_STATE = new TabBase();

export function tabBaseReducer(state: TabBase = INITIAL_STATE, a: Action): TabBase {

  const action = a as TabBaseAPIAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case TabLayout.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Set tab tooltip
    *****************************************************/
    case TabLayout.SET_TAB_TOOLTIP:
      state = {
        ...state,
        tabTooltip: action.meta.tabTooltip
      };
      break;
    /*****************************************************
    * Set tab loading
    *****************************************************/
    case TabLayout.SET_TAB_LOADING:
      state = {
        ...state,
        loading: action.meta.loading
      };
      break;
    /*****************************************************
    * Set show right panel
    *****************************************************/
    case TabLayout.SET_SHOW_RIGHT_AREA:
      state = {
        ...state,
        showRightArea: action.meta.showRightArea
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TabLayout.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

