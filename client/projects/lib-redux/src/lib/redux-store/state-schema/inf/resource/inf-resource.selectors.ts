import { createSelector } from '@ngrx/store';
import { getInfState } from '../getInfState';

export const getResourceState = createSelector(getInfState, s => s?.resource);

export const getResourceByPkEntityState = createSelector(getResourceState, state => state?.by_pk_entity);
export const getResourceByFkClassState = createSelector(getResourceState, state => state?.by_fk_class);

export const getResourceByPkEntity = (pkEntity: number) => createSelector(getResourceByPkEntityState, (state) => state?.[pkEntity]);
export const getResourceByFkClass = (fkClass: number) => createSelector(getResourceByFkClassState, (state) => state?.[fkClass]);
