import { createSelector } from '@ngrx/store';
import { getDatState } from '../dat.selectors';

export const getNamespaceState = createSelector(getDatState, s => s?.namespace);


export const getNamespaceByPkEntityState = createSelector(getNamespaceState, state => state?.by_pk_entity);

export const getNamespaceByPkEntity = (pkEntity: number) => createSelector(getNamespaceByPkEntityState, (state) => state?.[pkEntity]);

export const getNamespaceByFkProjectState = createSelector(getNamespaceState, state => state?.by_fk_project);

export const getNamespaceByFkProject = (fkProject: number) => createSelector(getNamespaceByFkProjectState, (state) => state?.[fkProject]);
