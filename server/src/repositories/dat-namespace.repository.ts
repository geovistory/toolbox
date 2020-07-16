import {DefaultCrudRepository} from '@loopback/repository';
import {DatNamespace, DatNamespaceRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatNamespaceRepository extends DefaultCrudRepository<
  DatNamespace,
  typeof DatNamespace.prototype.pk_entity,
  DatNamespaceRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DatNamespace, dataSource);
  }
}
