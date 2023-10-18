import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { createSelector } from '@ngrx/store';
import { getDfhState } from '../dfh.selectors';
import { dfhLabelByFksKey } from './dfh-label.reducer';

const getFeatureState = createSelector(getDfhState, s => s?.label);

export const indexState = createSelector(getFeatureState, state => state?.by_fks);
export const byClassState = createSelector(getFeatureState, state => state?.by_fk_class__type);
export const byProfileState = createSelector(getFeatureState, state => state?.by_fk_profile__type);
export const byPropertyState = createSelector(getFeatureState, state => state?.by_fk_property__type);

export const getDfhLabel = {
  byFks: (item: Partial<DfhLabel>) => createSelector(indexState, s => s[dfhLabelByFksKey(item)]),
  byClass: (klass: number, type: string) => createSelector(byClassState, s => s[klass + '_' + type]),
  byProfile: (profile: number, type: string) => createSelector(byProfileState, s => s[profile + '_' + type]),
  byProperty: (property: number, type: string) => createSelector(byPropertyState, s => s[property + '_' + type]),
}
