import { createSelector } from '@ngrx/store';
import { getSysState } from '../sys.selectors';

const getFeatureState = createSelector(getSysState, s => s?.config);

export const getSysConfig = createSelector(getFeatureState, state => state?.by_main?.main);

