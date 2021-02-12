import { FluxStandardAction } from 'flux-standard-action';
import { NotificationsI } from '../models';
declare type Payload = NotificationsI;
interface MetaData {
    itemsArray?: any[];
}
export declare type NotificationsAPIAction = FluxStandardAction<Payload, MetaData>;
export declare class NotificationsAPIActions {
    static readonly ADD_TOAST = "Notifications::ADD_TOAST";
    addToast: (payload: NotificationsI) => FluxStandardAction<NotificationsI, MetaData>;
}
export {};
