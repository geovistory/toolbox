import { combineReducers } from '@ngrx/store';

import { warEntityPreviewReducers } from './entity_preview/war-entity-preview.reducer';
import { WarState } from './war.models';

export const warReducers = combineReducers<WarState>({
  entity_preview: warEntityPreviewReducers
})
