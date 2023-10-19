import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infDimensionFeature } from './inf-dimension.reducer';

export const infDimensionActions = new CrudActionsFactory<InfDimension>(infFeatureKey, infDimensionFeature)
