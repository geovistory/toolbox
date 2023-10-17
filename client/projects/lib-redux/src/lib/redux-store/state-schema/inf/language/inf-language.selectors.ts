import { createSelector } from '@ngrx/store';
import { getInfState } from '../getInfState';

export const getLanguageState = createSelector(getInfState, s => s?.language);

export const getLanguageByPkEntityState = createSelector(getLanguageState, state => state?.by_pk_entity);

export const getLanguageByPkEntity = (pkEntity: number) => createSelector(getLanguageByPkEntityState, (state) => state?.[pkEntity]);
