import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infTimePrimitiveFeature } from './inf-time-primitive.reducer';

export const infTimePrimitiveActions = new CrudActionsFactory<InfTimePrimitive>(infFeatureKey, infTimePrimitiveFeature)
