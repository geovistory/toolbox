import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {InfTextProperty, InfTextPropertyRelations} from '../models';

export class InfTextPropertyRepository extends DefaultCrudRepository<
  InfTextProperty,
  typeof InfTextProperty.prototype.pk_entity,
  InfTextPropertyRelations
  > {


  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource
  ) {
    super(InfTextProperty, dataSource);

  }
}
