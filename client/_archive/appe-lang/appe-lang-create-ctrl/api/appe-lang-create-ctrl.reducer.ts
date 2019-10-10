import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { AppeLangCreateCtrl } from './appe-lang-create-ctrl.models';
import { AppeLangCreateCtrlAPIAction, AppeLangCreateCtrlAPIActions } from './appe-lang-create-ctrl.actions';

const INITIAL_STATE = new AppeLangCreateCtrl();

export function appeLangCreateCtrlReducer(state: AppeLangCreateCtrl = INITIAL_STATE, a: Action): AppeLangCreateCtrl {

  const action = a as AppeLangCreateCtrlAPIAction;

  switch (action.type) {
    case AppeLangCreateCtrlAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {}
      };
    case AppeLangCreateCtrlAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
    case AppeLangCreateCtrlAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {}
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case AppeLangCreateCtrlAPIActions.DESTROY:
    return undefined;
  }

  return state;
};

