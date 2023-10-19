import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getTextPropertyState = createSelector(getDatState, s => s?.text_property);


export const getTextPropertyByPkEntityState = createSelector(getTextPropertyState, state => state?.by_pk_entity);

export const getTextPropertyByPkEntity = (pkEntity: number) => createSelector(getTextPropertyByPkEntityState, (state) => state?.[pkEntity]);

export const getTextPropertyByFkEntityAndFkSysTypeState = createSelector(getTextPropertyState, state => state?.by_fk_entity__fk_system_type);

export const getTextPropertyByFkEntityAndFkSysType = (fkEntity: number, fkSystemType: number) => createSelector(getTextPropertyByFkEntityAndFkSysTypeState, (state) => state?.[fkEntity + '_' + fkSystemType]);
