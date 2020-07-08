import {DefaultCrudRepository} from '@loopback/repository';
import {DfhProperty, DfhPropertyRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DfhPropertyRepository extends DefaultCrudRepository<
  DfhProperty,
  typeof DfhProperty.prototype.pk_property,
  DfhPropertyRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhProperty, dataSource);
  }
}
