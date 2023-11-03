import { createSelector } from '@ngrx/store';
import { getDataState } from "../getDataState";

export const getTabState = createSelector(getDataState, s => s.tab);
