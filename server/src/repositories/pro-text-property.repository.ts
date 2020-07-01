import {DefaultCrudRepository} from '@loopback/repository';
import {ProTextProperty, ProTextPropertyRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProTextPropertyRepository extends DefaultCrudRepository<
  ProTextProperty,
  typeof ProTextProperty.prototype.pk_entity,
  ProTextPropertyRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProTextProperty, dataSource);
  }
}
