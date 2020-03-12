import { Action } from 'redux';
import { TabBase, TabLayoutAction } from './tab-layout.models';
import { TabLayoutActions } from './tab-layout.actions';

const INITIAL_STATE = new TabBase();

export function tabBaseReducer(state: TabBase = INITIAL_STATE, a: Action): TabBase {

  const action = a as TabLayoutAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case TabLayoutActions.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Set tab tooltip
    *****************************************************/
    case TabLayoutActions.SET_TAB_TOOLTIP:
      state = {
        ...state,
        tabTooltip: action.meta.tabTooltip
      };
      break;
    /*****************************************************
    * Set tab loading
    *****************************************************/
    case TabLayoutActions.SET_TAB_LOADING:
      state = {
        ...state,
        loading: action.meta.loading
      };
      break;
    /*****************************************************
    * Set show right panel
    *****************************************************/
    case TabLayoutActions.SET_SHOW_RIGHT_AREA:
      state = {
        ...state,
        showRightArea: action.meta.showRightArea
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TabLayoutActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

