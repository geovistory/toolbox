import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infTimePrimitiveFeature } from './inf-time-primitive.reducer';

export const infTimePrimitiveActions = new CrudActionsFactory<InfTimePrimitive>(infRoot, infTimePrimitiveFeature)
