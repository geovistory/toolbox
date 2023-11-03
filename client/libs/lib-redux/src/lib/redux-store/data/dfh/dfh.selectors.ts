import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getDfhState = createSelector(getDataState, s => s.dfh);
