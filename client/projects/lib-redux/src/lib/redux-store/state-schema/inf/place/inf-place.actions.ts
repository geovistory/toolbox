import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infPlaceFeature } from './inf-place.reducer';

export const infPlaceActions = new CrudActionsFactory<InfPlace>(infRoot, infPlaceFeature)
