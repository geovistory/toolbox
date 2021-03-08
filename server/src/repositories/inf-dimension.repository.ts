import {DefaultCrudRepository} from '@loopback/repository';
import {InfDimension, InfDimensionRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfDimensionRepository extends DefaultCrudRepository<
  InfDimension,
  typeof InfDimension.prototype.pk_entity,
  InfDimensionRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfDimension, dataSource);
  }
}
