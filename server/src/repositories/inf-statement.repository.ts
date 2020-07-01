import {DefaultCrudRepository} from '@loopback/repository';
import {InfStatement, InfStatementRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfStatementRepository extends DefaultCrudRepository<
  InfStatement,
  typeof InfStatement.prototype.pk_entity,
  InfStatementRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfStatement, dataSource);
  }
}
