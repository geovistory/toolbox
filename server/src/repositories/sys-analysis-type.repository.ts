import {DefaultCrudRepository} from '@loopback/repository';
import {SysAnalysisType, SysAnalysisTypeRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SysAnalysisTypeRepository extends DefaultCrudRepository<
  SysAnalysisType,
  typeof SysAnalysisType.prototype.pk_entity,
  SysAnalysisTypeRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(SysAnalysisType, dataSource);
  }
}
