import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DatDigital, DatDigitalApi } from '../sdk';
import { DatActions } from './dat.actions';
import { datRoot } from './dat.config';
import { DigitalSlice } from './dat.models';
import { ModifyActionMeta } from '../store/actions';


@Injectable()
export class DatEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public datActions: DatActions,
    public digitalApi: DatDigitalApi
  ) { }

  public createEpics(): Epic {
    const digitalEpicsFactory = new StandardEpicsFactory<DigitalSlice, DatDigital>
      (datRoot, 'digital', this.datActions.digital, this.notification);

    return combineEpics(

      digitalEpicsFactory.createUpsertEpic<ModifyActionMeta<DatDigital>>(
        (meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items)
      ),

    )
  }


}
