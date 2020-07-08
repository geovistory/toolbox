import {DefaultCrudRepository} from '@loopback/repository';
import {SysSystemType, SysSystemTypeRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysSystemTypeRepository extends DefaultCrudRepository<
  SysSystemType,
  typeof SysSystemType.prototype.pk_entity,
  SysSystemTypeRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysSystemType, dataSource);
  }
}
