import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getInfState = createSelector(getDataState, s => s?.inf);
