import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';
import { proClassFieldConfgByProjectAndClassKey } from './pro-class-field-config.reducer';

export const getClassFieldConfigState = createSelector(getProState, s => s?.class_field_config);

export const getClassFieldConfigByPkEntityState = createSelector(getClassFieldConfigState, state => state?.by_pk_entity);
export const getClassFieldConfigByPkEntity = (pkEntity: number) => createSelector(getClassFieldConfigByPkEntityState, (state) => state?.[pkEntity]);

export const getClassFieldConfigByFkProjectFkClassState = createSelector(getClassFieldConfigState, state => state?.by_fk_project__fk_class);
export const getClassFieldConfigByFkProjectFkClass = (key: Partial<ProClassFieldConfig>) =>
  createSelector(getClassFieldConfigByFkProjectFkClassState, (state) => state?.[proClassFieldConfgByProjectAndClassKey(key)]);

