import { createSelector } from '@ngrx/store';
import { getInfState } from '../getInfState';

export const getLangStringState = createSelector(getInfState, s => s?.lang_string);

export const getLangStringByPkEntityState = createSelector(getLangStringState, state => state?.by_pk_entity);

export const getLangStringByPkEntity = (pkEntity: number) => createSelector(getLangStringByPkEntityState, (state) => state?.[pkEntity]);
