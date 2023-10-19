import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infPlaceFeature } from './inf-place.reducer';

export const infPlaceActions = new CrudActionsFactory<InfPlace>(infFeatureKey, infPlaceFeature)
