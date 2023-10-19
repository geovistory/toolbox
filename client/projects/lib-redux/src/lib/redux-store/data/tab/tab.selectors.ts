import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getTabState = createSelector(getDataState, s => s.tab);
