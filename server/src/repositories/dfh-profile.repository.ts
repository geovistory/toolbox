import {DefaultCrudRepository} from '@loopback/repository';
import {DfhProfile, DfhProfileRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DfhProfileRepository extends DefaultCrudRepository<
  DfhProfile,
  typeof DfhProfile.prototype.pk_profile,
  DfhProfileRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhProfile, dataSource);
  }
}
