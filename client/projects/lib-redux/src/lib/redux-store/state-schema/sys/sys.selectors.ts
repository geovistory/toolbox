import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getSysState = createSelector(getDataState, s => s.sys);
