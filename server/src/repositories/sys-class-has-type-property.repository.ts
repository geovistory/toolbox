import {DefaultCrudRepository} from '@loopback/repository';
import {SysClassHasTypeProperty, SysClassHasTypePropertyRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysClassHasTypePropertyRepository extends DefaultCrudRepository<
  SysClassHasTypeProperty,
  typeof SysClassHasTypeProperty.prototype.pk_entity,
  SysClassHasTypePropertyRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysClassHasTypeProperty, dataSource);
  }
}
