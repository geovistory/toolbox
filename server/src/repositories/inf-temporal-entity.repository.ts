import {DefaultCrudRepository} from '@loopback/repository';
import {InfTemporalEntity, InfTemporalEntityRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfTemporalEntityRepository extends DefaultCrudRepository<
  InfTemporalEntity,
  typeof InfTemporalEntity.prototype.pk_entity,
  InfTemporalEntityRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfTemporalEntity, dataSource);
  }
}
