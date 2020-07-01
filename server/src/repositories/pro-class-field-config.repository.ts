import {DefaultCrudRepository} from '@loopback/repository';
import {ProClassFieldConfig, ProClassFieldConfigRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

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
