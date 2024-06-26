import { ProTableConfig } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proTableConfigFeature } from './pro-table-config.reducer';

export const proTableConfigActions = new CrudActionsFactory<ProTableConfig>(proFeatureKey, proTableConfigFeature)
