import {DefaultCrudRepository} from '@loopback/repository';
import {SysSystemRelevantClass, SysSystemRelevantClassRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysSystemRelevantClassRepository extends DefaultCrudRepository<
  SysSystemRelevantClass,
  typeof SysSystemRelevantClass.prototype.pk_entity,
  SysSystemRelevantClassRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysSystemRelevantClass, dataSource);
  }
}
