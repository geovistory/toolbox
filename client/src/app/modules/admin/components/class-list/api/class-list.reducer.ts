import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ClassList } from '../../../admin.models';
import { ClassListAPIAction, ClassListAPIActions } from './class-list.actions';

const INITIAL_STATE: ClassList = {
  items: {},
  loading: false,
  error: null,
};


export function classListReducer(state: ClassList = INITIAL_STATE, a: Action): ClassList {

  const action = a as ClassListAPIAction;


  switch (action.type) {
    case ClassListAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {},
        loading: true,
        error: null,
      };
    case ClassListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('dfh_pk_class'), action.meta.itemsArray),
        loading: false,
        error: null,
      };
    case ClassListAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {},
        loading: false,
        error: action.error,
      };
  }

  return state;
};

