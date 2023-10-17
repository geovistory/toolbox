import { InfAppellation } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infAppellationFeature } from './inf-appellation.reducer';

export const infAppellationActions = new CrudActionsFactory<InfAppellation>(infFeatureKey, infAppellationFeature)
