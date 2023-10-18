import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { warEntityPreviewReducerConfig } from './entity_preview/war-entity-preview.reducer';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: warEntityPreviewReducerConfig
}
