import {DefaultCrudRepository} from '@loopback/repository';
import {SysClassFieldPropertyRel, SysClassFieldPropertyRelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysClassFieldPropertyRelRepository extends DefaultCrudRepository<
  SysClassFieldPropertyRel,
  typeof SysClassFieldPropertyRel.prototype.pk_entity,
  SysClassFieldPropertyRelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysClassFieldPropertyRel, dataSource);
  }
}
