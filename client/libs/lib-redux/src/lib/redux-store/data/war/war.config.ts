import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { warEntityPreviewReducerConfig } from './entity_preview/war-entity-preview.reducer';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: warEntityPreviewReducerConfig
}
