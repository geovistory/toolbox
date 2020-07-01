import {DefaultCrudRepository} from '@loopback/repository';
import {ProInfoProjRel, ProInfoProjRelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProInfoProjRelRepository extends DefaultCrudRepository<
  ProInfoProjRel,
  typeof ProInfoProjRel.prototype.pk_entity,
  ProInfoProjRelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProInfoProjRel, dataSource);
  }
}
