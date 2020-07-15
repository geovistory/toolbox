import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InfAppellation, InfAppellationRelations, InfStatement, ProInfoProjRel} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InfStatementRepository} from './inf-statement.repository';
import {ProInfoProjRelRepository} from './pro-info-proj-rel.repository';

export class InfAppellationRepository extends DefaultCrudRepository<
  InfAppellation,
  typeof InfAppellation.prototype.pk_entity,
  InfAppellationRelations
  > {

  public readonly incoming_statements: HasManyRepositoryFactory<InfStatement, typeof InfAppellation.prototype.pk_entity>;

  public readonly entity_version_project_rels: HasManyRepositoryFactory<ProInfoProjRel, typeof InfAppellation.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>,
    @repository.getter('ProInfoProjRelRepository') protected proInfoProjRelRepositoryGetter: Getter<ProInfoProjRelRepository>,
  ) {
    super(InfAppellation, dataSource);
    this.entity_version_project_rels = this.createHasManyRepositoryFactoryFor('entity_version_project_rels', proInfoProjRelRepositoryGetter);
    this.registerInclusionResolver('entity_version_project_rels', this.entity_version_project_rels.inclusionResolver);
    this.incoming_statements = this.createHasManyRepositoryFactoryFor('incoming_statements', infStatementRepositoryGetter);
    this.registerInclusionResolver('incoming_statements', this.incoming_statements.inclusionResolver);
  }
}
