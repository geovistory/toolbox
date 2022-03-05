import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {DfhApiProfile, DfhApiProfileRelations} from '../models';

export class DfhApiProfileRepository extends DefaultCrudRepository<
  DfhApiProfile,
  typeof DfhApiProfile.prototype.pk_entity,
  DfhApiProfileRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhApiProfile, dataSource);
  }
}
