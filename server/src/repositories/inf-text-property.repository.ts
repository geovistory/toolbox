import {DefaultCrudRepository} from '@loopback/repository';
import {InfTextProperty, InfTextPropertyRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfTextPropertyRepository extends DefaultCrudRepository<
  InfTextProperty,
  typeof InfTextProperty.prototype.pk_entity,
  InfTextPropertyRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfTextProperty, dataSource);
  }
}
