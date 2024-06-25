import { createSelector } from '@ngrx/store';
import { getDfhState } from '../dfh.selectors';

const getFeatureState = createSelector(getDfhState, s => s?.profile);

export const indexState = createSelector(getFeatureState, state => state?.by_pk_profile);

export const getDfhProfile = {
  byProfile: (profile: number) => createSelector(indexState, s => s?.[profile]),
}
