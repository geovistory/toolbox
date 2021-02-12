import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { NotificationsI } from '../models';

type Payload = NotificationsI;
interface MetaData {
  itemsArray?: any[]
};
export type NotificationsAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class NotificationsAPIActions {
  static readonly ADD_TOAST = 'Notifications::ADD_TOAST';

  addToast = (payload: Payload): NotificationsAPIAction => ({
    type: NotificationsAPIActions.ADD_TOAST,
    meta: null,
    payload
  });

}
