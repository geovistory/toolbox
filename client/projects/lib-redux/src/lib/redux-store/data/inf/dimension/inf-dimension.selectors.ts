import { createSelector } from '@ngrx/store';
import { getInfState } from '../inf.selectors';

export const getDimensionState = createSelector(getInfState, s => s?.dimension);

export const getDimensionByPkEntityState = createSelector(getDimensionState, state => state?.by_pk_entity);

export const getDimensionByPkEntity = (pkEntity: number) => createSelector(getDimensionByPkEntityState, (state) => state?.[pkEntity]);
