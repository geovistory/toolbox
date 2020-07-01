import {DefaultCrudRepository} from '@loopback/repository';
import {DatTextProperty, DatTextPropertyRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatTextPropertyRepository extends DefaultCrudRepository<
  DatTextProperty,
  typeof DatTextProperty.prototype.pk_entity,
  DatTextPropertyRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DatTextProperty, dataSource);
  }
}
