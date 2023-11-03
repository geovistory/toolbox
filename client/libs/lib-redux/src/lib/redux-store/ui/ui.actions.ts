import { createAction, props } from '@ngrx/store';
import { UiState } from './ui.models';

/**
 * Set the entire ui state
 */
export const setUiState = createAction('Set Ui State', props<{ ui: UiState }>())
