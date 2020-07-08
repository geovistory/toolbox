import {DefaultCrudRepository} from '@loopback/repository';
import {SysClassField, SysClassFieldRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysClassFieldRepository extends DefaultCrudRepository<
  SysClassField,
  typeof SysClassField.prototype.pk_entity,
  SysClassFieldRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysClassField, dataSource);
  }
}
