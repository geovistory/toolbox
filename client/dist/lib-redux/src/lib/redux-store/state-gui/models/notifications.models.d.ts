import { ToastOptions } from '@cime/ngx-toasty';
export interface NotificationsI {
    type: 'info' | 'success' | 'wait' | 'error' | 'warning';
    options: ToastOptions;
}
export declare class Notifications implements NotificationsI {
    type: 'info' | 'success' | 'wait' | 'error' | 'warning';
    options: ToastOptions;
    constructor(data?: NotificationsI);
}
