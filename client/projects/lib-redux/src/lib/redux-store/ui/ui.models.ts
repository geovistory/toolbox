import { AccountState } from './account/account.model';
import { ActiveProjectState } from './active-project/active-project.models';
import { LoadingBarState } from './loading-bar/loading-bar.models';
import { NotificationState } from './notification/notification.models';

export interface UiState {
  account: AccountState,
  loadingBar: LoadingBarState,
  activeProject: ActiveProjectState,
  notifications: NotificationState,
}
