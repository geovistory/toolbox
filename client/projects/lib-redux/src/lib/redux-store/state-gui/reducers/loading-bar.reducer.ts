import { Action } from 'redux';
import { LoadingBarAction, LoadingBarActions } from '../actions';
import { LoadingBar } from '../models';

const INITIAL_STATE: LoadingBar = {
  loading: false,
  progress: 0,
};


export function loadingBarReducer(state: LoadingBar = INITIAL_STATE, a: Action): LoadingBar {

  const action = a as LoadingBarAction;


  switch (action.type) {

    case LoadingBarActions.START:
      return {
        ...state,
        loading: true
      };

    case LoadingBarActions.STOP:
      return {
        ...state,
        loading: false,
      };

    case LoadingBarActions.COPMLETE:
      return {
        ...state,
        loading: false,
      };
  }

  return state;
};

