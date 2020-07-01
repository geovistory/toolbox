import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {InfStatement, InfStatementRelations} from '../models';

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
