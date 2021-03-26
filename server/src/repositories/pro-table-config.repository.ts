/* eslint-disable @typescript-eslint/camelcase */
import {DefaultCrudRepository} from '@loopback/repository';
import {ProTableConfig, ProTableConfigRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProTableConfigRepository extends DefaultCrudRepository<
  ProTableConfig,
//   typeof ProTableConfig.prototype.pk_entity,
  ProTableConfigRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProTableConfig, dataSource);
  }
}
