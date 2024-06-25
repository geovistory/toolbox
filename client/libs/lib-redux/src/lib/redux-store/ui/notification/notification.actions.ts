import { createActionGroup, props } from '@ngrx/store';

export class ToastOptions {
  title: string;
  msg?: string;
  showClose?: boolean;
  theme?: string;
  timeout?: number;
  onAdd?: Function;
  onRemove?: Function;
}

// Interface of this slice of store
export interface Toast {
  type: 'info' | 'success' | 'error' | 'warn';
  uid?: string,
  options: ToastOptions;
}

export const notificationActions = createActionGroup({
  source: 'Notification',
  events: {
    'Add': props<{ toast: Toast }>(),
    'Remove': props<{ uid: string }>()
  }
})
