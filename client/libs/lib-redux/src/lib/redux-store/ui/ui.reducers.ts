import { combineReducers, createReducer, on } from '@ngrx/store'
import { composeReducers } from '../_lib/composeReducers'
import { accountReducer } from './account/account.reducers'
import { activeProjectReducer } from './active-project/active-project.reducer'
import { loadingBarReducer } from './loading-bar/loading-bar.reducer'
import { notificationReducer } from './notification/notification.reducer'
import { setUiState } from './ui.actions'
import { UiState } from './ui.models'


const dataRootReducers = createReducer({},
  // set the entire ui state
  on(setUiState, (_, action) => action.ui)
)

export const uiReducers = composeReducers(
  combineReducers<UiState>({
    account: accountReducer,
    loadingBar: loadingBarReducer,
    activeProject: activeProjectReducer,
    notifications: notificationReducer
  }),
  dataRootReducers
)
