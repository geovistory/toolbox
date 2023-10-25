import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getSysState = createSelector(getDataState, s => s.sys);
