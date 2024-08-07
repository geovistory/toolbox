import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { warFeatureKey } from "../war.feature.key";

export const warEntityPreviewFeature = 'entity_preview'
export const warEntityPreviewReducerConfig: ReducerConfig<WarEntityPreview> = {
  indexBy: {
    keyInStore: 'project_id__pk_entity',
    indexByFn: (item: WarEntityPreview) => item.fk_project + '_' + item.pk_entity
  }
}

export const warEntityPreviewReducers = createModelReducers(warFeatureKey, warEntityPreviewFeature, warEntityPreviewReducerConfig)

