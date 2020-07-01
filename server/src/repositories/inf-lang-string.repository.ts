import {DefaultCrudRepository} from '@loopback/repository';
import {InfLangString, InfLangStringRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfLangStringRepository extends DefaultCrudRepository<
  InfLangString,
  typeof InfLangString.prototype.pk_entity,
  InfLangStringRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfLangString, dataSource);
  }
}
