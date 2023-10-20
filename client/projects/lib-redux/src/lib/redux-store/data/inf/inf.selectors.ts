import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getInfState = createSelector(getDataState, s => s?.inf);
