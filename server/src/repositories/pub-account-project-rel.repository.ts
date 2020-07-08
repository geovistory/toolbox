import {DefaultCrudRepository} from '@loopback/repository';
import {PubAccountProjectRel, PubAccountProjectRelRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PubAccountProjectRelRepository extends DefaultCrudRepository<
  PubAccountProjectRel,
  typeof PubAccountProjectRel.prototype.id,
  PubAccountProjectRelRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(PubAccountProjectRel, dataSource);
  }
}
