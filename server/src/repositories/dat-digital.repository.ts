import {DefaultCrudRepository} from '@loopback/repository';
import {DatDigital, DatDigitalRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatDigitalRepository extends DefaultCrudRepository<
  DatDigital,
  typeof DatDigital.prototype.pk_entity,
  DatDigitalRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DatDigital, dataSource);
  }
}
