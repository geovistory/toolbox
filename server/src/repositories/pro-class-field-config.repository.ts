import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {ProClassFieldConfig, ProClassFieldConfigRelations} from '../models';

export class ProClassFieldConfigRepository extends DefaultCrudRepository<
  ProClassFieldConfig,
  typeof ProClassFieldConfig.prototype.pk_entity,
  ProClassFieldConfigRelations
  > {

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProClassFieldConfig, dataSource);
  }
}
