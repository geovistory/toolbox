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
export interface NotificationsI {
  type: 'info' | 'success' | 'error' | 'warn';
  options: ToastOptions;
}

// Class of this slice of store
export class Notifications implements NotificationsI {
  type: 'info' | 'success' | 'error' | 'warn';
  options: ToastOptions;

  constructor(data?: NotificationsI) {
    Object.assign(this, data);
  }
}
