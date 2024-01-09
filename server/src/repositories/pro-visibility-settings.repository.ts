import {inject} from '@loopback/core';
import {AnyObject, DataObject, DefaultCrudRepository} from '@loopback/repository';
import {Postgres1DataSource} from '../datasources';
import {ProVisibilitySettings, ProVisibilitySettingsRelations} from '../models/pro-visibility-settings.model';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';

export class ProVisibilitySettingsRepository extends DefaultCrudRepository<
  ProVisibilitySettings,
  typeof ProVisibilitySettings.prototype.pk_entity,
  ProVisibilitySettingsRelations
> {

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource) {
    super(ProVisibilitySettings, dataSource);

  }

  // This is a workaround in order to not loose the additional properties on indexes like {"9":{...}}
  override async create(entity: DataObject<ProVisibilitySettings>, options?: AnyObject | undefined): Promise<ProVisibilitySettings> {
    const schema = this.entityClass.definition.settings.postgresql.schema;
    const table = this.entityClass.definition.settings.postgresql.table;
    const params = [entity.fk_project, entity.settings];
    const res = await this.dataSource.execute(`
    INSERT INTO ${schema}.${table} (fk_project, settings)
    VALUES ($1,$2)
    `, params);
    return res;
  }


  // This is a workaround in order to not loose the additional properties on indexes like {"9":{...}}
  async findByProjectId(projectId: number): Promise<ProVisibilitySettings | undefined> {
    const schema = this.entityClass.definition.settings.postgresql.schema;
    const table = this.entityClass.definition.settings.postgresql.table;

    const b = new SqlBuilderLb4Models(this.dataSource);
    b.sql = `SELECT ${b.getColumns(ProVisibilitySettings.definition)} FROM ${schema}.${table} WHERE fk_project = $1`
    b.addParam(projectId)
    const res: ProVisibilitySettings[] = await b.execute();

    return res?.[0];
  }

}
