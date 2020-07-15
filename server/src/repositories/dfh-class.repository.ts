import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DfhClass, DfhClassRelations, ProDfhClassProjRel, DfhProperty, ProClassFieldConfig, InfPersistentItem} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProDfhClassProjRelRepository} from './pro-dfh-class-proj-rel.repository';
import {DfhPropertyRepository} from './dfh-property.repository';
import {ProClassFieldConfigRepository} from './pro-class-field-config.repository';
import {InfPersistentItemRepository} from './inf-persistent-item.repository';

export class DfhClassRepository extends DefaultCrudRepository<
  DfhClass,
  typeof DfhClass.prototype.pk_class,
  DfhClassRelations
  > {

  public readonly proj_rels: HasManyRepositoryFactory<ProDfhClassProjRel, typeof DfhClass.prototype.pk_class>;

  public readonly ingoing_properties: HasManyRepositoryFactory<DfhProperty, typeof DfhClass.prototype.pk_class>;

  public readonly outgoing_properties: HasManyRepositoryFactory<DfhProperty, typeof DfhClass.prototype.pk_class>;

  public readonly class_field_configs: HasManyRepositoryFactory<ProClassFieldConfig, typeof DfhClass.prototype.pk_class>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('ProDfhClassProjRelRepository') protected proDfhClassProjRelRepositoryGetter: Getter<ProDfhClassProjRelRepository>,
    @repository.getter('DfhPropertyRepository') protected dfhPropertyRepositoryGetter: Getter<DfhPropertyRepository>,
    @repository.getter('ProClassFieldConfigRepository') protected proClassFieldConfigRepositoryGetter: Getter<ProClassFieldConfigRepository>,
  ) {
    super(DfhClass, dataSource);
    this.class_field_configs = this.createHasManyRepositoryFactoryFor('class_field_configs', proClassFieldConfigRepositoryGetter);
    this.registerInclusionResolver('class_field_configs', this.class_field_configs.inclusionResolver);
    this.outgoing_properties = this.createHasManyRepositoryFactoryFor('outgoing_properties', dfhPropertyRepositoryGetter);
    this.registerInclusionResolver('outgoing_properties', this.outgoing_properties.inclusionResolver);
    this.ingoing_properties = this.createHasManyRepositoryFactoryFor('ingoing_properties', dfhPropertyRepositoryGetter);
    this.registerInclusionResolver('ingoing_properties', this.ingoing_properties.inclusionResolver);
    this.proj_rels = this.createHasManyRepositoryFactoryFor('proj_rels', proDfhClassProjRelRepositoryGetter);
    this.registerInclusionResolver('proj_rels', this.proj_rels.inclusionResolver);
  }
}
