import { createSelector } from '@ngrx/store';
import { getInfState } from '../inf.selectors';

export const getTimePrimitiveState = createSelector(getInfState, s => s?.time_primitive);

export const getTimePrimitiveByPkEntityState = createSelector(getTimePrimitiveState, state => state?.by_pk_entity);

export const getTimePrimitiveByPkEntity = (pkEntity: number) => createSelector(getTimePrimitiveByPkEntityState, (state) => state?.[pkEntity]);
