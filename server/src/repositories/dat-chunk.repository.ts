import {DefaultCrudRepository} from '@loopback/repository';
import {DatChunk, DatChunkRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatChunkRepository extends DefaultCrudRepository<
  DatChunk,
  typeof DatChunk.prototype.pk_entity,
  DatChunkRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DatChunk, dataSource);
  }
}
