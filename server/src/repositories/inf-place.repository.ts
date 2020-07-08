import {DefaultCrudRepository} from '@loopback/repository';
import {InfPlace, InfPlaceRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfPlaceRepository extends DefaultCrudRepository<
  InfPlace,
  typeof InfPlace.prototype.pk_entity,
  InfPlaceRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfPlace, dataSource);
  }
}
