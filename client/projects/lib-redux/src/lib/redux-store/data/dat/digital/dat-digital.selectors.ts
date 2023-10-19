import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getDigitalState = createSelector(getDatState, s => s?.digital);

export const getDigitalByPkEntityAndVersionState = createSelector(getDigitalState, state => state?.by_pk_entity__entity_version);

export const getDigitalByPkEntityAndVersion = (pkEntity: number, version: number) => createSelector(getDigitalByPkEntityAndVersionState, (state) => state?.[pkEntity + '_' + version]);

export const getDigitalByPkEntityState = createSelector(getDigitalState, state => state?.by_pk_entity);

export const getDigitalByPkEntity = (pkEntity: number) => createSelector(getDigitalByPkEntityState, (state) => state?.[pkEntity]);

export const getDigitalByPkTextState = createSelector(getDigitalState, state => state?.by_pk_text);

export const getDigitalByPkText = (pkText: number) => createSelector(getDigitalByPkTextState, (state) => state?.[pkText]);
