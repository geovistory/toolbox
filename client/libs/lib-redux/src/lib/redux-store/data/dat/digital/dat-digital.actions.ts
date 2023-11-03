import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datDigitalFeature } from './dat-digital.reducer';

export const datDigitalActions = new CrudActionsFactory<DatDigital>(datFeatureKey, datDigitalFeature)
