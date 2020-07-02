import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {InfStatement, InfStatementRelations, ProInfoProjRel} from '../models';
import {ProInfoProjRelRepository} from './pro-info-proj-rel.repository';

export class InfStatementRepository extends DefaultCrudRepository<
  InfStatement,
  typeof InfStatement.prototype.pk_entity,
  InfStatementRelations
  > {
  public readonly entity_version_project_rels: HasManyRepositoryFactory<ProInfoProjRel, typeof ProInfoProjRel.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('ProInfoProjRelRepository') protected proInfoProjRelRepositoryGetter: Getter<ProInfoProjRelRepository>,

  ) {
    super(InfStatement, dataSource);


    this.entity_version_project_rels = this.createHasManyRepositoryFactoryFor('entity_version_project_rels', proInfoProjRelRepositoryGetter,);
    this.registerInclusionResolver('entity_version_project_rels', this.entity_version_project_rels.inclusionResolver)

  }
}
