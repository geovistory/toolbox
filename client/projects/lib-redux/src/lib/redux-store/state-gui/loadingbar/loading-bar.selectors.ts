import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingBarState } from './loading-bar.models';
export const loadingbarFeatureName = 'loadingbar'
const getLoadingBarState = createFeatureSelector<LoadingBarState>(loadingbarFeatureName);
const getRunningJobsCount = createSelector(getLoadingBarState, (state) => state.runningJobsCount);
export const loadingBarQuery = { getRunningJobsCount }
