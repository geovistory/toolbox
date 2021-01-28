import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {WarStatement, WarStatementRelations} from '../models';

export class WarStatementRepository extends DefaultCrudRepository<
  WarStatement,
  typeof WarStatement.prototype.pk_entity,
  WarStatementRelations
  > {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(WarStatement, dataSource);
  }
}
