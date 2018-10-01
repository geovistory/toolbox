import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';

/**
 * This class combines all the actions that are considered
 * to be root actions.
 *
 * Root actions are actions executed on the root slice of
 * the store (IAppState).
 *
 * This class is usefull to call rootActions from Components
 * and Epics that are connected to a substore and that do not
 * know the RootActions per se.
 */

export class RootActions extends LoadingBarActions {

}
