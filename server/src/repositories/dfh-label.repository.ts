import {DefaultCrudRepository} from '@loopback/repository';
import {DfhLabel, DfhLabelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DfhLabelRepository extends DefaultCrudRepository<
  DfhLabel,
  typeof DfhLabel.prototype.type,
  DfhLabelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(DfhLabel, dataSource);
  }
}
