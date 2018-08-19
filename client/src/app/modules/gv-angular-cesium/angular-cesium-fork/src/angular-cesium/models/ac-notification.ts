import { ActionType } from './action-type.enum';
import { AcEntity } from './ac-entity';

/**
 * Interface of  Angular2Cesium notification.
 * ac-layer receives an observer of AcNotifications
 */
export interface AcNotification {
  id: string;
	entity?: AcEntity;
	actionType: ActionType;
}

export class AcNotification {
  id: string;
	entity?: AcEntity;
	actionType: ActionType;
}
