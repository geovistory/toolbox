import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';

export const getProjectState = createSelector(getProState, s => s?.project);

export const getProjectByPkEntityState = createSelector(getProjectState, state => state?.by_pk_entity);

export const getProjectByPkEntity = (pkEntity: number) => createSelector(getProjectByPkEntityState, (state) => state?.[pkEntity]);
