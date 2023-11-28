import { createSelector } from '@ngrx/store';
import { getDfhState } from '../dfh.selectors';

const getFeatureState = createSelector(getDfhState, s => s?.property);

export const indexState = createSelector(getFeatureState, state => state?.by_pk_property__has_domain__has_range);
export const byDomainState = createSelector(getFeatureState, state => state?.by_has_domain);
export const byRangeState = createSelector(getFeatureState, state => state?.by_has_range);
export const byPropertyState = createSelector(getFeatureState, state => state?.by_pk_property);
export const byHasTypeSubpropertyState = createSelector(getFeatureState, state => state?.by_is_has_type_subproperty);

export const getDfhProperty = {
  byPropDomainRange: (prop: number, domainClass: number, rangeClass: number) => createSelector(indexState, s => s?.[prop + '_' + domainClass + '_' + rangeClass]),
  byDomain: (domainClass: number) => createSelector(byDomainState, s => s?.[domainClass]),
  byRange: (rangeClass: number) => createSelector(byRangeState, s => s?.[rangeClass]),
  byProperty: (prop: number) => createSelector(byPropertyState, s => s?.[prop]),
  byHasTypeSubproperty: (isHasTypeSubProp: boolean) => createSelector(byHasTypeSubpropertyState, s => s?.[isHasTypeSubProp ? 'true' : 'false']),
}
