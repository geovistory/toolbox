import { DatNamespace } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datNamespaceFeature } from './dat-namespace.reducer';

export const datNamespaceActions = new CrudActionsFactory<DatNamespace>(datFeatureKey, datNamespaceFeature)
