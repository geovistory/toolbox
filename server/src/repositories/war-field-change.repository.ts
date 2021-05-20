import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {WarFieldChange} from '../models/war-field-change.model';

export class WarFieldChangeRepository extends DefaultCrudRepository<
  WarFieldChange,
  number
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(WarFieldChange, dataSource);
  }
}
