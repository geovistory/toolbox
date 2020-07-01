import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {InfTemporalEntity, InfTemporalEntityRelations, ProInfoProjRel, InfStatement, InfTextProperty} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InfStatementRepository} from './inf-statement.repository';
import {InfTextPropertyRepository} from './inf-text-property.repository';

export class InfTemporalEntityRepository extends DefaultCrudRepository<
  InfTemporalEntity,
  typeof InfTemporalEntity.prototype.pk_entity,
  InfTemporalEntityRelations
> {
  public readonly entity_version_project_rels: HasManyRepositoryFactory<ProInfoProjRel, typeof InfTemporalEntity.prototype.pk_entity>;

  public readonly outgoing_statements: HasManyRepositoryFactory<InfStatement, typeof InfTemporalEntity.prototype.pk_entity>;

  public readonly incoming_statements: HasManyRepositoryFactory<InfStatement, typeof InfTemporalEntity.prototype.pk_entity>;

  public readonly text_properties: HasManyRepositoryFactory<InfTextProperty, typeof InfTemporalEntity.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>, @repository.getter('InfTextPropertyRepository') protected infTextPropertyRepositoryGetter: Getter<InfTextPropertyRepository>,
  ) {
    super(InfTemporalEntity, dataSource);
    this.text_properties = this.createHasManyRepositoryFactoryFor('text_properties', infTextPropertyRepositoryGetter,);
    this.registerInclusionResolver('text_properties', this.text_properties.inclusionResolver);
    this.incoming_statements = this.createHasManyRepositoryFactoryFor('incoming_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('incoming_statements', this.incoming_statements.inclusionResolver);
    this.outgoing_statements = this.createHasManyRepositoryFactoryFor('outgoing_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('outgoing_statements', this.outgoing_statements.inclusionResolver);
    this.entity_version_project_rels = this.createHasManyRepositoryFactoryFor('entity_version_project_rels', proInfoProjRelRepositoryGetter,);
    this.registerInclusionResolver('entity_version_project_rels', this.entity_version_project_rels.inclusionResolver);

  }
}
