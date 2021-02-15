import { Injectable } from '@angular/core';
import { DatChunk, DatChunkApi, DatColumn, DatColumnApi, DatDigital, DatDigitalApi, DatNamespace, DatNamespaceApi, SchemaObject } from '@kleiolab/lib-sdk-lb3';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { ChunkActionsFactory, ColumnActionsFactory, DatActions, DigitalActionsFactory, LoadChunksOfDigitalAction, LoadColumnsOfTableAction } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { ChunkSlice, ColumnSlice, DigitalSlice, NamespaceSlice } from '../models/dat.models';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaObjectService } from '../services/schema-object.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { LoadActionMeta, LoadVersionAction, ModifyActionMeta } from '../_helpers/schema-actions-factory';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';


@Injectable({
  providedIn: 'root'
})
export class DatEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public datActions: DatActions,
    public infActions: InfActions,
    public proActions: ProActions,
    public digitalApi: DatDigitalApi,
    public chunkApi: DatChunkApi,
    public columnApi: DatColumnApi,
    public namespaceApi: DatNamespaceApi,
    private schemaObjectService: SchemaObjectService
  ) { }

  public createEpics(): Epic {
    const digitalEpicsFactory = new SchemaEpicsFactory<DigitalSlice, DatDigital>
      (datRoot, 'digital', this.datActions.digital, this.notification);

    const chunkEpicsFactory = new SchemaEpicsFactory<ChunkSlice, DatChunk>
      (datRoot, 'chunk', this.datActions.chunk, this.notification);

    const namespaceEpicsFactory = new SchemaEpicsFactory<NamespaceSlice, DatNamespace>
      (datRoot, 'namespace', this.datActions.namespace, this.notification);

    const columnEpicsFactory = new SchemaEpicsFactory<ColumnSlice, DatColumn>
      (datRoot, 'column', this.datActions.column, this.notification);

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
        (meta) => this.digitalApi.bulkDelete(meta.items.map(item => item.pk_entity))
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
      ),

      columnEpicsFactory.createLoadEpic<LoadColumnsOfTableAction>(
        (meta) => this.columnApi.ofDigital(meta.pk, meta.pkDigital),
        ColumnActionsFactory.COLUMNS_OF_TABLE,
        (results, pk) => {
          const schemaObject = results as unknown as SchemaObject;

          this.schemaObjectService.storeSchemaObject(schemaObject, pk)
        }
      ),

    )
  }


}
