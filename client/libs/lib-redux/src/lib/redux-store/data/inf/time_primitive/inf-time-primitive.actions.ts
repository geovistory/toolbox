import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infTimePrimitiveFeature } from './inf-time-primitive.reducer';

export const infTimePrimitiveActions = new CrudActionsFactory<InfTimePrimitive>(infFeatureKey, infTimePrimitiveFeature)
