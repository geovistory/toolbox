import {DefaultCrudRepository} from '@loopback/repository';
import {DfhClass, DfhClassRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DfhClassRepository extends DefaultCrudRepository<
  DfhClass,
  typeof DfhClass.prototype.pk_class,
  DfhClassRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhClass, dataSource);
  }
}
