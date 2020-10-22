import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DatChunk, DatChunkRelations, InfStatement, DatDigital, DatNamespace} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InfStatementRepository} from './inf-statement.repository';
import {DatDigitalRepository} from './dat-digital.repository';
import {DatNamespaceRepository} from './dat-namespace.repository';

export class DatChunkRepository extends DefaultCrudRepository<
  DatChunk,
  typeof DatChunk.prototype.pk_entity,
  DatChunkRelations
  > {

  public readonly outgoing_statements: HasManyRepositoryFactory<InfStatement, typeof DatChunk.prototype.pk_entity>;

  public readonly digital: BelongsToAccessor<DatDigital, typeof DatChunk.prototype.pk_entity>;

  public readonly namespace: BelongsToAccessor<DatNamespace, typeof DatChunk.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('InfStatementRepository') protected infStatementRepositoryGetter: Getter<InfStatementRepository>,
    @repository.getter('DatDigitalRepository') protected datDigitalRepositoryGetter: Getter<DatDigitalRepository>,
    @repository.getter('DatNamespaceRepository') protected datNamespaceRepositoryGetter: Getter<DatNamespaceRepository>,
  ) {
    super(DatChunk, dataSource);
    this.namespace = this.createBelongsToAccessorFor('namespace', datNamespaceRepositoryGetter,);
    this.registerInclusionResolver('namespace', this.namespace.inclusionResolver);
    this.digital = this.createBelongsToAccessorFor('digital', datDigitalRepositoryGetter,);
    this.registerInclusionResolver('digital', this.digital.inclusionResolver);

    this.outgoing_statements = this.createHasManyRepositoryFactoryFor('outgoing_statements', infStatementRepositoryGetter,);
    this.registerInclusionResolver('outgoing_statements', this.outgoing_statements.inclusionResolver)
  }
}
