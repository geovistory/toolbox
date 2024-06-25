import { createReducer, on } from '@ngrx/store';
import { LoadingBarActions } from './loading-bar.actions';
import { LoadingBarState } from './loading-bar.models';

export const initialState: LoadingBarState = {
  runningJobsCount: 0,
};

export const loadingBarReducer = createReducer(initialState,
  on(LoadingBarActions.ADD_JOB, (state) => ({
    ...state,
    runningJobsCount: state.runningJobsCount + 1
  })),
  on(LoadingBarActions.REMOVE_JOB, (state) => {
    if (state.runningJobsCount > 0) {
      return {
        ...state,
        runningJobsCount: state.runningJobsCount - 1
      };
    } else {
      console.warn('Impossible Error: Wanted to remove more jobs than existing');
      return state
    }
  })
)
