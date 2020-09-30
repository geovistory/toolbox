import {DefaultCrudRepository} from '@loopback/repository';
import {DfhApiProfile, DfhApiProfileRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DfhApiProfileRepository extends DefaultCrudRepository<
  DfhApiProfile,
  typeof DfhApiProfile.prototype.pk_profile,
  DfhApiProfileRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhApiProfile, dataSource);
  }
}
