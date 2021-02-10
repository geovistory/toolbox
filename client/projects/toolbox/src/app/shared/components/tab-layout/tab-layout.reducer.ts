import { Action } from 'redux';
import { TabBaseAPIAction } from './tab-layout';
import { TabLayoutAcitons } from './tab-layout.actions';
import { TabBase } from './tab-layout.models';

const INITIAL_STATE = new TabBase();

export function tabBaseReducer(state: TabBase = INITIAL_STATE, a: Action): TabBase {

  const action = a as TabBaseAPIAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case TabLayoutAcitons.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Set tab tooltip
    *****************************************************/
    case TabLayoutAcitons.SET_TAB_TOOLTIP:
      state = {
        ...state,
        tabTooltip: action.meta.tabTooltip
      };
      break;
    /*****************************************************
    * Set tab loading
    *****************************************************/
    case TabLayoutAcitons.SET_TAB_LOADING:
      state = {
        ...state,
        loading: action.meta.loading
      };
      break;
    /*****************************************************
    * Set show right panel
    *****************************************************/
    case TabLayoutAcitons.SET_LAYOUT_MODE:
      state = {
        ...state,
        layoutMode: action.meta.layoutMode
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TabLayoutAcitons.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

