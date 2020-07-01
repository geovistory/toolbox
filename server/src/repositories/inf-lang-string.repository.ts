import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {InfLangString, InfLangStringRelations, InfStatement, InfLanguage} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InfStatementRepository} from './inf-statement.repository';
import {InfLanguageRepository} from './inf-language.repository';

export class InfLangStringRepository extends DefaultCrudRepository<
  InfLangString,
  typeof InfLangString.prototype.pk_entity,
  InfLangStringRelations
> {

  public readonly incoming_statements: HasManyRepositoryFactory<InfStatement, typeof InfLangString.prototype.pk_entity>;

  public readonly language: BelongsToAccessor<InfLanguage, typeof InfLangString.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>, @repository.getter('InfLanguageRepository') protected infLanguageRepositoryGetter: Getter<InfLanguageRepository>,
  ) {
    super(InfLangString, dataSource);
    this.language = this.createBelongsToAccessorFor('language', infLanguageRepositoryGetter,);
    this.registerInclusionResolver('language', this.language.inclusionResolver);
    this.incoming_statements = this.createHasManyRepositoryFactoryFor('incoming_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('incoming_statements', this.incoming_statements.inclusionResolver);
  }
}
