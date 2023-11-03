import { createSelector } from '@ngrx/store';
import { getInfState } from '../inf.selectors';

export const getPlaceState = createSelector(getInfState, s => s?.place);

export const getPlaceByPkEntityState = createSelector(getPlaceState, state => state?.by_pk_entity);

export const getPlaceByPkEntity = (pkEntity: number) => createSelector(getPlaceByPkEntityState, (state) => state?.[pkEntity]);
