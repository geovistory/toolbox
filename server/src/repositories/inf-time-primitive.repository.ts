import {DefaultCrudRepository} from '@loopback/repository';
import {InfTimePrimitive, InfTimePrimitiveRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfTimePrimitiveRepository extends DefaultCrudRepository<
  InfTimePrimitive,
  typeof InfTimePrimitive.prototype.pk_entity,
  InfTimePrimitiveRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfTimePrimitive, dataSource);
  }
}
