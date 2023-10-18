import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proClassFieldConfigFeature } from './pro-class-field-config.reducer';

export const proClassFieldConfigActions = new CrudActionsFactory<ProClassFieldConfig>(proFeatureKey, proClassFieldConfigFeature)
