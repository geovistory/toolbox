import { DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datTextPropertyFeature } from './dat-text-property.reducer';

export const datTextPropertyActions = new CrudActionsFactory<DatTextProperty>(datFeatureKey, datTextPropertyFeature)
