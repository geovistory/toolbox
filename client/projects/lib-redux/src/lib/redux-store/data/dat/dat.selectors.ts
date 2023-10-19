import { createSelector } from '@ngrx/store';
import { getDataState } from '../data.selectors';

export const getDatState = createSelector(getDataState, s => s.dat);
