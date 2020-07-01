import {DefaultCrudRepository, HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {InfPersistentItem, InfPersistentItemRelations, ProInfoProjRel, InfStatement, InfTextProperty, DfhClass} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InfStatementRepository} from './inf-statement.repository';
import {InfTextPropertyRepository} from './inf-text-property.repository';
import {DfhClassRepository} from './dfh-class.repository';

export class InfPersistentItemRepository extends DefaultCrudRepository<
  InfPersistentItem,
  typeof InfPersistentItem.prototype.pk_entity,
  InfPersistentItemRelations
> {

  public readonly entity_version_project_rels: HasManyRepositoryFactory<ProInfoProjRel, typeof InfPersistentItem.prototype.pk_entity>;

  public readonly incoming_statements: HasManyRepositoryFactory<InfStatement, typeof InfPersistentItem.prototype.pk_entity>;

  public readonly outgoing_statements: HasManyRepositoryFactory<InfStatement, typeof InfPersistentItem.prototype.pk_entity>;

  public readonly text_properties: HasManyRepositoryFactory<InfTextProperty, typeof InfPersistentItem.prototype.pk_entity>;

  public readonly dfh_class: BelongsToAccessor<DfhClass, typeof InfPersistentItem.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>, @repository.getter('InfTextPropertyRepository') protected infTextPropertyRepositoryGetter: Getter<InfTextPropertyRepository>, @repository.getter('DfhClassRepository') protected dfhClassRepositoryGetter: Getter<DfhClassRepository>,
  ) {
    super(InfPersistentItem, dataSource);
    this.dfh_class = this.createBelongsToAccessorFor('dfh_class', dfhClassRepositoryGetter,);
    this.registerInclusionResolver('dfh_class', this.dfh_class.inclusionResolver);
    this.text_properties = this.createHasManyRepositoryFactoryFor('text_properties', infTextPropertyRepositoryGetter,);
    this.registerInclusionResolver('text_properties', this.text_properties.inclusionResolver);
    this.outgoing_statements = this.createHasManyRepositoryFactoryFor('outgoing_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('outgoing_statements', this.outgoing_statements.inclusionResolver);
    this.incoming_statements = this.createHasManyRepositoryFactoryFor('incoming_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('incoming_statements', this.incoming_statements.inclusionResolver);
    this.entity_version_project_rels = this.createHasManyRepositoryFactoryFor('entity_version_project_rels', proInfoProjRelRepositoryGetter,);
    this.registerInclusionResolver('entity_version_project_rels', this.entity_version_project_rels.inclusionResolver);

  }
}
