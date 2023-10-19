import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getColumnState = createSelector(getDatState, s => s?.column);

export const getColumnByPkEntityState = createSelector(getColumnState, state => state?.by_pk_entity);

export const getColumnByPkEntity = (pkEntity: number) => createSelector(getColumnByPkEntityState, (state) => state?.[pkEntity]);

export const getColumnByFkDigitalState = createSelector(getColumnState, state => state?.by_fk_digital);

export const getColumnByFkDigital = (fkDigital: number) => createSelector(getColumnByFkDigitalState, (state) => state?.[fkDigital]);
