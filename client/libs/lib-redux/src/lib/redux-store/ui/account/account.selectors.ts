import { createSelector } from '@ngrx/store';
import { getUiState } from '../ui.selectors';

export const getAccount = createSelector(getUiState, s => s?.account?.account)
export const getAccountRoles = createSelector(getUiState, s => s?.account?.roles)
