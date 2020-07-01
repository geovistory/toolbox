import {DefaultCrudRepository} from '@loopback/repository';
import {ProAnalysis, ProAnalysisRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProAnalysisRepository extends DefaultCrudRepository<
  ProAnalysis,
  typeof ProAnalysis.prototype.pk_entity,
  ProAnalysisRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProAnalysis, dataSource);
  }
}
