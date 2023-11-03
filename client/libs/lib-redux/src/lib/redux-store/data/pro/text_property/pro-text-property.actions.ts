import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proTextPropertyFeature } from './pro-text-property.reducer';

export const proTextPropertyActions = new CrudActionsFactory<ProTextProperty>(proFeatureKey, proTextPropertyFeature)
