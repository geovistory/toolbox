import {DefaultCrudRepository} from '@loopback/repository';
import {DatColumn, DatColumnRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatColumnRepository extends DefaultCrudRepository<
  DatColumn,
  typeof DatColumn.prototype.pk_entity,
  DatColumnRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DatColumn, dataSource);
  }
}
