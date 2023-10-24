import { omit } from 'ramda';
import { cleanupResolvedAction } from './resolved.actions';


export const resolvedReducers = (state = {}, action) => {

  if (action && action.meta && action.meta.removePending) {
    const uuid = action.meta.removePending;
    state = {
      ...state,
      [uuid]: action.meta
    }
  }
  if (action && action.type === cleanupResolvedAction.type) {
    const uuid = action.uuid;
    state = {
      ...omit([uuid], state)
    }
  }
  return state;
}
