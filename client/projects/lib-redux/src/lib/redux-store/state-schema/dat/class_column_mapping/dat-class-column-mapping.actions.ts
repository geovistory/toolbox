import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datClassColumnMappingFeature } from './dat-class-column-mapping.reducer';

export const datClassColumnMappingActions = new CrudActionsFactory<DatClassColumnMapping>(datFeatureKey, datClassColumnMappingFeature)
