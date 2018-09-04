import { pick } from 'ramda';
import { Action } from 'redux';

import { ClassDetail } from '../../../admin.models';
import { ContrVocabAPIAction, ContrVocabAPIActions } from './contr-vocab.actions';

const INITIAL_STATE: ClassDetail = {
  class: {},
  loading: false,
  error: null,
};

export function classReducer(state: ClassDetail = INITIAL_STATE, a: Action): ClassDetail {

  const action = a as ContrVocabAPIAction;


  switch (action.type) {
    case ContrVocabAPIActions.LOAD_STARTED:
      return {
        ...state,
        class: {},
        loading: true,
        error: null,
      };

    case ContrVocabAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        class: pick(['dfh_standard_label'], action.payload),
        loading: false,
        error: null,
      };

  }

  return state;
};

