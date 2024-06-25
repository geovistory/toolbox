import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getDatState = createSelector(getDataState, s => s.dat);
