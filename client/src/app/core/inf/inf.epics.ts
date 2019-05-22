import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/store/epics';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { InfPersistentItem, InfPersistentItemApi } from '../sdk';
import { InfActions, LoadByPkAction, PeItActionFactory } from './inf.actions';
import { PersistentItemSlice } from './inf.models';



@Injectable()
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public peItApi: InfPersistentItemApi,
    public infActions: InfActions
  ) { }

  public createEpics(): Epic {
    const persistentItemEpicsFactory = new StandardEpicsFactory<PersistentItemSlice, InfPersistentItem>
      ('inf', 'persistent_item', this.infActions.persistent_item, this.notification);

    return combineEpics(
      persistentItemEpicsFactory.createLoadEpic<LoadByPkAction>((meta) => this.peItApi
        .nestedObjectOfProject(meta.pk, meta.pkEntity), PeItActionFactory.NESTED_BY_PK)

    );
  }


}
