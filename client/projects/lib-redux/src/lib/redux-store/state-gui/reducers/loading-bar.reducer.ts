import { Action } from 'redux';
import { LoadingBarAction, LoadingBarActions } from '../actions/loading-bar.actions';
import { LoadingBar } from '../models/loading-bar.models';

const INITIAL_STATE: LoadingBar = {
  runningJobsCount: 0,
};


export function loadingBarReducer(state: LoadingBar = INITIAL_STATE, a: Action): LoadingBar {

  const action = a as LoadingBarAction;


  switch (action.type) {

    case LoadingBarActions.ADD_JOB:
      return {
        ...state,
        runningJobsCount: state.runningJobsCount + 1
      };

    case LoadingBarActions.REMOVE_JOB:
      if (state.runningJobsCount > 0) {
        return {
          ...state,
          runningJobsCount: state.runningJobsCount - 1
        };
      } else {
        console.warn('Impossible Error: Wanted to remove more jobs than existing');
      }

  }

  return state;
};

