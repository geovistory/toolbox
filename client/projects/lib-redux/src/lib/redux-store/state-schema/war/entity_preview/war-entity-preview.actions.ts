import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { warFeatureKey } from "../war.feature.key";
import { warEntityPreviewFeature } from './war-entity-preview.reducer';

export const warEntityPreviewActions = new CrudActionsFactory<WarEntityPreview>(warFeatureKey, warEntityPreviewFeature)
