import { createSelector } from '@ngrx/store';
import { getInfState } from '../getInfState';

export const getAppellationState = createSelector(getInfState, s => s?.appellation);

export const getAppellationByPkEntityState = createSelector(getAppellationState, state => state?.by_pk_entity);

export const getAppellationByPkEntity = (pkEntity: number) => createSelector(getAppellationByPkEntityState, (state) => state?.[pkEntity]);
