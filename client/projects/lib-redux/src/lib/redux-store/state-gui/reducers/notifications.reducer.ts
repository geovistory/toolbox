import { Action } from 'redux';
import { NotificationsAPIAction } from '../actions/notifications.actions';
import { Notifications } from '../models/notifications.models';

const INITIAL_STATE = new Notifications();

export function notificationsReducer(state: Notifications = INITIAL_STATE, a: Action): Notifications {

  const action = a as NotificationsAPIAction;

  switch (action.type) { }

  return state;
};

