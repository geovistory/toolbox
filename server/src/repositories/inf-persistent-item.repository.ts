import {DefaultCrudRepository} from '@loopback/repository';
import {InfPersistentItem, InfPersistentItemRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfPersistentItemRepository extends DefaultCrudRepository<
  InfPersistentItem,
  typeof InfPersistentItem.prototype.pk_entity,
  InfPersistentItemRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfPersistentItem, dataSource);
  }
}
