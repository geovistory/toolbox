import {DefaultCrudRepository} from '@loopback/repository';
import {SysAppContext, SysAppContextRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysAppContextRepository extends DefaultCrudRepository<
  SysAppContext,
  typeof SysAppContext.prototype.pk_entity,
  SysAppContextRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysAppContext, dataSource);
  }
}
