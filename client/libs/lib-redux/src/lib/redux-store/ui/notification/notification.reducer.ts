import { createReducer, on } from '@ngrx/store';
import { notificationActions, Toast } from './notification.actions';

export const initialState: Toast[] = [];
export const notificationReducer = createReducer(initialState,
  on(notificationActions.add, (state, action) => [...state, normalizeToast(action.toast)]),
  on(notificationActions.remove, (state, action) => state.filter(s => s.uid !== action.uid))
)

// Sets default values
function normalizeToast(toast: Toast) {
  if (!toast.options.title && !toast.options.msg) {
    if (toast.type === 'error') {
      toast.options.title = 'Oops, something went wrong!'
    }
  }
  return toast
}
