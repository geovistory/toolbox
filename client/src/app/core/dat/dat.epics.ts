import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DatDigital, DatDigitalApi, DatNamespace, DatNamespaceApi } from '../sdk';
import { DatActions } from './dat.actions';
import { datRoot } from './dat.config';
import { DigitalSlice, NamespaceSlice } from './dat.models';
import { ModifyActionMeta, LoadActionMeta } from '../store/actions';


@Injectable()
export class DatEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public datActions: DatActions,
    public digitalApi: DatDigitalApi,
    public namespaceApi: DatNamespaceApi,
  ) { }

  public createEpics(): Epic {
    const digitalEpicsFactory = new StandardEpicsFactory<DigitalSlice, DatDigital>
      (datRoot, 'digital', this.datActions.digital, this.notification);

    const namespaceEpicsFactory = new StandardEpicsFactory<NamespaceSlice, DatNamespace>
      (datRoot, 'namespace', this.datActions.namespace, this.notification);

    return combineEpics(

      digitalEpicsFactory.createUpsertEpic<ModifyActionMeta<DatDigital>>(
        (meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items)
      ),
      digitalEpicsFactory.createDeleteEpic(
        (items) => this.digitalApi.bulkDelete(items.map(item => item.pk_entity))
      ),
      namespaceEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.namespaceApi.byProject(meta.pk), ''
      )
    )
  }


}
