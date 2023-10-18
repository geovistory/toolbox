import { createSelector } from '@ngrx/store';
import { getSysState } from '../sys.selectors';

const getFeatureState = createSelector(getSysState, s => s?.system_relevant_class);


export const byPkEntityState = createSelector(getFeatureState, (s) => s.by_pk_entity)
const byFkClassState = createSelector(getFeatureState, (s) => s.by_fk_class)
const byRequiredBySourcesState = createSelector(getFeatureState, (s) => s.by_required_by_sources)
const byRequiredState = createSelector(getFeatureState, (s) => s.by_required)

export const getSystemRelevantClass = {
  byPkEntity$: (pkEntity: number) => createSelector(byPkEntityState, s => s?.[pkEntity]),
  byFkClass$: (fkClass: number) => createSelector(byFkClassState, s => s?.[fkClass]),
  byRequiredBySources$: (required: boolean) => createSelector(byRequiredBySourcesState, s => s?.[required ? 'true' : 'false']),
  byRequired$: (required: boolean) => createSelector(byRequiredState, s => s?.[required ? 'true' : 'false']),
}
