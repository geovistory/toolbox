import { createSelector } from '@ngrx/store';
import { getDfhState } from '../dfh.selectors';

const getFeatureState = createSelector(getDfhState, s => s?.klass);

export const byPkClassState = createSelector(getFeatureState, state => state?.by_pk_class);
export const byBasicTypeState = createSelector(getFeatureState, state => state?.by_basic_type);

export const getDfhClass = {
  byPkClass$: (pkClass: number) => createSelector(byPkClassState, s => s?.[pkClass]),
  byBasicType$: (basicType: number) => createSelector(byBasicTypeState, s => s?.[basicType]),
}
