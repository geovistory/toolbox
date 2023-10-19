import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getDfhState = createSelector(getDataState, s => s.dfh);
