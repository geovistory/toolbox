import { pick } from 'ramda';
import { Action } from 'redux';

import { ClassDetail } from '../../../admin.models';
import { ClassAPIAction, ClassAPIActions } from './class.actions';

const INITIAL_STATE: ClassDetail = {
  class: {},
  loading: false,
  error: null,
};

export function classReducer(state: ClassDetail = INITIAL_STATE, a: Action): ClassDetail {

  const action = a as ClassAPIAction;


  switch (action.type) {
    case ClassAPIActions.LOAD_STARTED:
      return {
        ...state,
        class: {},
        loading: true,
        error: null,
      };

    case ClassAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        class: pick(['dfh_standard_label'], action.payload),
        loading: false,
        error: null,
      };

  }

  return state;
};

