import {DefaultCrudRepository} from '@loopback/repository';
import {PubAccount, PubAccountRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PubAccountRepository extends DefaultCrudRepository<
  PubAccount,
  typeof PubAccount.prototype.pk_entity,
  PubAccountRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(PubAccount, dataSource);
  }
}
