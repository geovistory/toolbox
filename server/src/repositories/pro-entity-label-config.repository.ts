/* eslint-disable @typescript-eslint/camelcase */
import {DefaultCrudRepository} from '@loopback/repository';
import {ProEntityLabelConfig, ProEntityLabelConfigRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProEntityLabelConfigRepository extends DefaultCrudRepository<
  ProEntityLabelConfig,
  typeof ProEntityLabelConfig.prototype.pk_entity,
  ProEntityLabelConfigRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProEntityLabelConfig, dataSource);
  }
}
