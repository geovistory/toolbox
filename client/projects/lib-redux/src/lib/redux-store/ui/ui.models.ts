import { AccountState } from './account/account.model';
import { ActiveProjectState } from './activeProject/active-project.models';
import { LoadingBarState } from './loadingBar/loading-bar.models';

export interface UiState {
  account: AccountState,
  loadingBar: LoadingBarState,
  activeProject: ActiveProjectState,
}
