import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { warFeatureKey } from "../war.feature.key";

export const warEntityPreviewFeature = 'entity_preview'
export const warEntityPreviewReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'project_id__pk_entity',
    indexByFn: (item: WarEntityPreview) => item.project_id + '_' + item.pk_entity
  }
}

export const warEntityPreviewReducers = new CrudReducerFactory(warFeatureKey, { [warEntityPreviewFeature]: warEntityPreviewReducerConfig }).createReducers();

