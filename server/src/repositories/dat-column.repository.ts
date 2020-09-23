/* eslint-disable @typescript-eslint/camelcase */
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatColumn, DatColumnRelations, DatNamespace} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatNamespaceRepository} from './dat-namespace.repository';

export class DatColumnRepository extends DefaultCrudRepository<
  DatColumn,
  typeof DatColumn.prototype.pk_entity,
  DatColumnRelations
> {

  public readonly namespace: BelongsToAccessor<DatNamespace, typeof DatColumn.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('DatNamespaceRepository') protected datNamespaceRepositoryGetter: Getter<DatNamespaceRepository>,
  ) {
    super(DatColumn, dataSource);
    this.namespace = this.createBelongsToAccessorFor('namespace', datNamespaceRepositoryGetter,);
    this.registerInclusionResolver('namespace', this.namespace.inclusionResolver);
  }
}
