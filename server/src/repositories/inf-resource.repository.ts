import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {InfResource, InfStatement, InfResourceRelations, ProInfoProjRel} from '../models';
import {InfStatementRepository} from './inf-statement.repository';
import {ProInfoProjRelRepository} from './pro-info-proj-rel.repository';

export class InfResourceRepository extends DefaultCrudRepository<
  InfResource,
  typeof InfResource.prototype.pk_entity,
  InfResourceRelations
  > {
  public readonly entity_version_project_rels: HasManyRepositoryFactory<ProInfoProjRel, typeof InfResource.prototype.pk_entity>;

  public readonly outgoing_statements: HasManyRepositoryFactory<InfStatement, typeof InfResource.prototype.pk_entity>;

  public readonly incoming_statements: HasManyRepositoryFactory<InfStatement, typeof InfResource.prototype.pk_entity>;


  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>,
    @repository.getter('ProInfoProjRelRepository') protected proInfoProjRelRepositoryGetter: Getter<ProInfoProjRelRepository>,
  ) {
    super(InfResource, dataSource);

    this.incoming_statements = this.createHasManyRepositoryFactoryFor('incoming_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('incoming_statements', this.incoming_statements.inclusionResolver);
    this.outgoing_statements = this.createHasManyRepositoryFactoryFor('outgoing_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('outgoing_statements', this.outgoing_statements.inclusionResolver);
    this.entity_version_project_rels = this.createHasManyRepositoryFactoryFor('entity_version_project_rels', proInfoProjRelRepositoryGetter,);
    this.registerInclusionResolver('entity_version_project_rels', this.entity_version_project_rels.inclusionResolver);

  }
}
