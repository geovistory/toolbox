import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getProState = createSelector(getDataState, s => s.pro);

