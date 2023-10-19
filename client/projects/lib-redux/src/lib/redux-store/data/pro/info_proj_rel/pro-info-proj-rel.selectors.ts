import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';

const getInfoProjRelState = createSelector(getProState, s => s?.info_proj_rel);

export const getInfoProjRelByFkProjectPkEntityState = createSelector(getInfoProjRelState, state => state?.by_fk_project__fk_entity);

export const getInfoProjRelByFkProjectPkEntity = (fkProject: number, pkEntity: number) => createSelector(getInfoProjRelByFkProjectPkEntityState, (state) => state?.[fkProject + '_' + pkEntity]);
