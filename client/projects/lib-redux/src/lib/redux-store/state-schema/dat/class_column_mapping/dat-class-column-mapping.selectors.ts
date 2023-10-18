import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getClassColumnMappingState = createSelector(getDatState, s => s?.class_column_mapping);

export const getClassColumnMappingByPkEntityState = createSelector(getClassColumnMappingState, state => state?.by_pk_entity);

export const getClassColumnMappingByPkEntity = (pkEntity: number) => createSelector(getClassColumnMappingByPkEntityState, (state) => state?.[pkEntity]);

export const getClassColumnMappingByFkColumnState = createSelector(getClassColumnMappingState, state => state?.by_fk_column);

export const getClassColumnMappingByFkColumn = (fkColumn: number) => createSelector(getClassColumnMappingByFkColumnState, (state) => state?.[fkColumn]);
