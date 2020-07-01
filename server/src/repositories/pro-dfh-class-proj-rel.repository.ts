import {DefaultCrudRepository} from '@loopback/repository';
import {ProDfhClassProjRel, ProDfhClassProjRelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProDfhClassProjRelRepository extends DefaultCrudRepository<
  ProDfhClassProjRel,
  typeof ProDfhClassProjRel.prototype.pk_entity,
  ProDfhClassProjRelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProDfhClassProjRel, dataSource);
  }
}
