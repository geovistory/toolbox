import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getChunkState = createSelector(getDatState, s => s?.chunk);

export const getChunkByPkEntityState = createSelector(getChunkState, state => state?.by_pk_entity);

export const getChunkByPkEntity = (pkEntity: number) => createSelector(getChunkByPkEntityState, (state) => state?.[pkEntity]);

export const getChunkByFkTextState = createSelector(getChunkState, state => state?.by_fk_text);

export const getChunkByFkText = (fkText: number) => createSelector(getChunkByFkTextState, (state) => state?.[fkText]);
