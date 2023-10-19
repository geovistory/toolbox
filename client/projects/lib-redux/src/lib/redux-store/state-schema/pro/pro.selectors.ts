import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getProState = createSelector(getDataState, s => s.pro);

