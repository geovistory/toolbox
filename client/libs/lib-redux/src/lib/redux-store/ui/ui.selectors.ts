import { createFeatureSelector } from '@ngrx/store';
import { uiFeatureKey } from './ui.feature.key';
import { UiState } from './ui.models';

export const getUiState = createFeatureSelector<UiState>(uiFeatureKey);
