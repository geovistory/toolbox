import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {WarClassPreview, WarClassPreviewRelations} from '../models';

export class WarClassPreviewRepository extends DefaultCrudRepository<
  WarClassPreview,
  typeof WarClassPreview.prototype.pk_entity,
  WarClassPreviewRelations
  > {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(WarClassPreview, dataSource);
  }
}
