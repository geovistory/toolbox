import { Action } from 'redux';
import { TypeCtrl } from './type-ctrl.models';
import { TypeCtrlAPIAction, TypeCtrlAPIActions } from './type-ctrl.actions';

const INITIAL_STATE = new TypeCtrl();

export function typeCtrlReducer(state: TypeCtrl = INITIAL_STATE, a: Action): TypeCtrl {

  const action = a as TypeCtrlAPIAction;

  switch (action.type) {
    case TypeCtrlAPIActions.LOAD:
      state = {
        ...state,
        loading: true,
        items: []
      };
      break;
    case TypeCtrlAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        items: action.payload.items
      };
      break;

    case TypeCtrlAPIActions.LOAD_FAILED:
      state = {
        ...state,
        loading: false,
        items: []
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypeCtrlAPIActions.DESTROY:
      // state = {
      //   pkTypedClass: state.pkTypedClass
      // };
      break;

  }

  return state;
};

