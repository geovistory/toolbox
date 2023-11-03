import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getWarState = createSelector(getDataState, s => s?.war)
