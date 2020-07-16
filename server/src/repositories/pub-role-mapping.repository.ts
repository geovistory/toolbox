import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PubRoleMapping, PubRoleMappingRelations, PubRole} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PubRoleRepository} from './pub-role.repository';

export class PubRoleMappingRepository extends DefaultCrudRepository<
  PubRoleMapping,
  typeof PubRoleMapping.prototype.id,
  PubRoleMappingRelations
> {

  public readonly role: BelongsToAccessor<PubRole, typeof PubRoleMapping.prototype.id>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('PubRoleRepository') protected pubRoleRepositoryGetter: Getter<PubRoleRepository>,
  ) {
    super(PubRoleMapping, dataSource);
    this.role = this.createBelongsToAccessorFor('role', pubRoleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
