import { createSelector } from '@ngrx/store';
import { getUiState } from '../ui.selectors';

export const getToasts = createSelector(getUiState, s => s?.notifications)
