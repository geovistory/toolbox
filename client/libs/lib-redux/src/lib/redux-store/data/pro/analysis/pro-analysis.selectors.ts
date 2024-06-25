import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';

export const getAnalysisState = createSelector(getProState, s => s?.analysis);

export const getAnalysisByPkEntityState = createSelector(getAnalysisState, state => state?.by_pk_entity);

export const getAnalysisByPkEntity = (pkEntity: number) => createSelector(getAnalysisByPkEntityState, (state) => state?.[pkEntity]);
