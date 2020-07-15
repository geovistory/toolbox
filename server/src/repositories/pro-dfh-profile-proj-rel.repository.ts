import {DefaultCrudRepository} from '@loopback/repository';
import {ProDfhProfileProjRel, ProDfhProfileProjRelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProDfhProfileProjRelRepository extends DefaultCrudRepository<
  ProDfhProfileProjRel,
  typeof ProDfhProfileProjRel.prototype.pk_entity,
  ProDfhProfileProjRelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProDfhProfileProjRel, dataSource);
  }
}
