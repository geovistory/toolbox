import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';

const getFeatureState = createSelector(getProState, s => s?.table_config);

export const byPkEntityState = createSelector(getFeatureState, state => state?.by_pk_entity);

export const getByPkEntity = (pkEntity: number) => createSelector(byPkEntityState, (state) => state?.[pkEntity]);

export const byFkDigitalState = createSelector(getFeatureState, state => state?.by_fk_digital);

export const getByFkDigital = (pkDigital: number) => createSelector(byFkDigitalState, (state) => state?.[pkDigital]);
