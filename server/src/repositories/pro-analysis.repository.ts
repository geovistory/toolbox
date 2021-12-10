import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {ProAnalysis, ProAnalysisRelations} from '../models';

export class ProAnalysisRepository extends DefaultCrudRepository<
  ProAnalysis,
  typeof ProAnalysis.prototype.pk_entity,
  ProAnalysisRelations
> {

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource) {
    super(ProAnalysis, dataSource);

  }

  async upsert(record: ProAnalysis): Promise<ProAnalysis> {
    try {
      if (record.pk_entity) await this.replaceById(record.pk_entity, record);
      else record = await super.create(record);
    } catch (e) {
      console.log(e)
    }
    return record;
  }
}
