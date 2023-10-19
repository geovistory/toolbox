import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getWarState = createSelector(getDataState, s => s?.war)
