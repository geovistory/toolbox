import { DatColumn } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datColumnFeature } from './dat-column.reducer';

export const datColumnActions = new CrudActionsFactory<DatColumn>(datFeatureKey, datColumnFeature)
