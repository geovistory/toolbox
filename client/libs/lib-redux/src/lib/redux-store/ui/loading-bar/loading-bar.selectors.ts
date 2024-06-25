import { createSelector } from '@ngrx/store';
import { getUiState } from '../ui.selectors';


const getLoadingBarState = createSelector(getUiState, s => s.loadingBar);
const getRunningJobsCount = createSelector(getLoadingBarState, (state) => state.runningJobsCount);
export const loadingBarQuery = { getRunningJobsCount }
