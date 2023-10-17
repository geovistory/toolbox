import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infDimensionFeature } from './inf-dimension.reducer';

export const infDimensionActions = new CrudActionsFactory<InfDimension>(infRoot, infDimensionFeature)
