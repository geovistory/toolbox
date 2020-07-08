import {DefaultCrudRepository} from '@loopback/repository';
import {PubRole, PubRoleRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PubRoleRepository extends DefaultCrudRepository<
  PubRole,
  typeof PubRole.prototype.id,
  PubRoleRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(PubRole, dataSource);
  }
}
