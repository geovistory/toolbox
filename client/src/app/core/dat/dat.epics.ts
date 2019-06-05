import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { DatDigital, DatDigitalApi, DatNamespace, DatNamespaceApi, DatChunk, DatChunkApi } from '../sdk';
import { DatActions, DigitalActionsFactory, LoadVersionAction, ChunkActionsFactory, LoadChunksOfDigitalAction } from './dat.actions';
import { datRoot } from './dat.config';
import { DigitalSlice, NamespaceSlice, ChunkSlice } from './dat.models';
import { ModifyActionMeta, LoadActionMeta } from '../store/actions';
import { LoadByPkAction, InfActions } from '../inf/inf.actions';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { ProActions } from '../pro/pro.actions';


@Injectable()
export class DatEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public datActions: DatActions,
    public infActions: InfActions,
    public proActions: ProActions,
    public digitalApi: DatDigitalApi,
    public chunkApi: DatChunkApi,
    public namespaceApi: DatNamespaceApi,
  ) { }

  public createEpics(): Epic {
    const digitalEpicsFactory = new StandardEpicsFactory<DigitalSlice, DatDigital>
      (datRoot, 'digital', this.datActions.digital, this.notification);

    const chunkEpicsFactory = new StandardEpicsFactory<ChunkSlice, DatChunk>
      (datRoot, 'chunk', this.datActions.chunk, this.notification);

    const namespaceEpicsFactory = new StandardEpicsFactory<NamespaceSlice, DatNamespace>
      (datRoot, 'namespace', this.datActions.namespace, this.notification);

    return combineEpics(

      // Digital
      digitalEpicsFactory.createLoadEpic<LoadVersionAction>(
        (meta) => this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null),
        DigitalActionsFactory.LOAD_VERSION
      ),
      digitalEpicsFactory.createUpsertEpic<ModifyActionMeta<DatDigital>>(
        (meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items)
      ),
      digitalEpicsFactory.createDeleteEpic(
        (items) => this.digitalApi.bulkDelete(items.map(item => item.pk_entity))
      ),

      // Chunk
      chunkEpicsFactory.createLoadEpic<LoadChunksOfDigitalAction>(
        (meta) => this.chunkApi.ofDigital(meta.pk, meta.pkDigital),
        ChunkActionsFactory.CHUNKS_OF_DIGITAL,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.chunk.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      // Namespace
      namespaceEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.namespaceApi.byProject(meta.pk), ''
      )
    )
  }


}
