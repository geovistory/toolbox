import { combineReducers } from '@ngrx/store'
import { accountReducer } from './account/account.reducers'
import { activeProjectReducer } from './active-project/active-project.reducer'
import { loadingBarReducer } from './loading-bar/loading-bar.reducer'
import { notificationReducer } from './notification/notification.reducer'
import { UiState } from './ui.models'

export const uiReducers = combineReducers<UiState>({
  account: accountReducer,
  loadingBar: loadingBarReducer,
  activeProject: activeProjectReducer,
  notifications: notificationReducer
})
