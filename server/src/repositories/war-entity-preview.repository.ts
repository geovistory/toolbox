import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {WarEntityPreview, WarEntityPreviewRelations} from '../models';

export class WarEntityPreviewRepository extends DefaultCrudRepository<
  WarEntityPreview,
  typeof WarEntityPreview.prototype.pk_entity,
  WarEntityPreviewRelations
  > {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(WarEntityPreview, dataSource);
  }
}
