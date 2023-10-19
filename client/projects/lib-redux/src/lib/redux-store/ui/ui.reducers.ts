import { combineReducers } from '@ngrx/store'
import { accountReducer } from './account/account.reducers'
import { activeProjectReducer } from './activeProject/active-project.reducer'
import { loadingBarReducer } from './loadingBar/loading-bar.reducer'

export const uiReducers = combineReducers({
  account: accountReducer,
  loadingBar: loadingBarReducer,
  activeProject: activeProjectReducer,
})
