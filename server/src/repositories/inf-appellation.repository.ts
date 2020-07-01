import {DefaultCrudRepository} from '@loopback/repository';
import {InfAppellation, InfAppellationRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfAppellationRepository extends DefaultCrudRepository<
  InfAppellation,
  typeof InfAppellation.prototype.pk_entity,
  InfAppellationRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfAppellation, dataSource);
  }
}
