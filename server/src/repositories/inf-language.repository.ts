import {DefaultCrudRepository} from '@loopback/repository';
import {InfLanguage, InfLanguageRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InfLanguageRepository extends DefaultCrudRepository<
  InfLanguage,
  typeof InfLanguage.prototype.pk_entity,
  InfLanguageRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(InfLanguage, dataSource);
  }
}
