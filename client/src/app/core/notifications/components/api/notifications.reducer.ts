import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { Notifications } from './notifications.models';
import { NotificationsAPIAction } from './notifications.actions';

const INITIAL_STATE = new Notifications();

export function notificationsReducer(state: Notifications = INITIAL_STATE, a: Action): Notifications {

  const action = a as NotificationsAPIAction;

  switch (action.type) { }

  return state;
};

