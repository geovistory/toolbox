import { ToastOptions } from '@kleiolab/ng2-toasty';

// Interface of this slice of store
export interface NotificationsI {
  type: 'info' | 'success' | 'wait' | 'error' | 'warning';
  options: ToastOptions;
}

// Class of this slice of store
export class Notifications implements NotificationsI {
  type: 'info' | 'success' | 'wait' | 'error' | 'warning';
  options: ToastOptions;

  constructor(data?: NotificationsI) {
    Object.assign(this, data);
  }
}
