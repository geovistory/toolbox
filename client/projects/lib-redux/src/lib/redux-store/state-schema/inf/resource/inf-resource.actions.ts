import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infResourceFeature } from './inf-resource.reducer';

export const infResourceActions = new CrudActionsFactory<InfResource>(infFeatureKey, infResourceFeature)
