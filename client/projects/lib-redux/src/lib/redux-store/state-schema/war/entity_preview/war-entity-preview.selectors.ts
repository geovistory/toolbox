import { createSelector } from '@ngrx/store';
import { getWarState } from '../war.selectors';

const getFeatureState = createSelector(getWarState, s => s?.entity_preview);

export const byProjectIdPkEntity = createSelector(getFeatureState, state => state?.by_project_id__pk_entity);
export const getByProjectIdPkEntity = (projectId: number, pkEntity: number) => createSelector(byProjectIdPkEntity, (state) => state?.[projectId + '_' + pkEntity]);

