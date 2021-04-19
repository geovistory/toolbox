/* eslint-disable @typescript-eslint/camelcase */
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { tags } from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import { model, property, repository } from '@loopback/repository';
import { get, HttpErrors, param, post, requestBody } from '@loopback/rest';
import { keys, uniq } from 'ramda';
import { Roles } from '../components/authorization/keys';
import { QMatchedRowsFromColumn } from '../components/query/q-matched-rows-from-column';
import { QTableColumns } from '../components/query/q-table-columns';
import { QTableDatColumns } from '../components/query/q-table-dat-columns';
import { GetTablePageOptions, QTableTablePage, TablePageResponse } from '../components/query/q-table-page';
import { Postgres1DataSource } from '../datasources';
import { ProTableConfig, TableConfig } from '../models';
import { DatColumn } from '../models/dat-column.model';
import { FkProjectFkEntity, PkEntity } from '../models/gv-negative-schema-object.model';
import { GvPositiveSchemaObject } from '../models/gv-positive-schema-object.model';
import { GvSchemaModifier } from '../models/gv-schema-modifier.model';
import { DatClassColumnMappingRepository, DatColumnRepository, DatNamespaceRepository, DfhClassRepository, InfLanguageRepository, ProInfoProjRelRepository, ProTableConfigRepository, PubAccountRepository } from '../repositories';

@model()
export class MapColumnBody {
  @property({ required: true }) pkColumn: number;
  @property({ required: true }) pkClass: number;
}

@model()
export class UnmapColumnBody {
  @property({ required: true }) pkColumn: number;
  @property() deleteAll: boolean;
}

@model()
export class MapColumnPageResponse {
  @property() ok?: boolean;
  @property() error?: string;
}

@model()
export class UnMapCheckResponse {
  @property() ok: boolean;
  @property() matchingNb: number;
}

/**
 * A controller to get data from and about tables (digitals)
 */
@tags('table')
export class TableController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @repository(DatColumnRepository) public datColumnRepo: DatColumnRepository,
    @repository(DfhClassRepository) public dfhClassRepo: DfhClassRepository,
    @repository(DatNamespaceRepository) public datNamespaceRepo: DatNamespaceRepository,
    @repository(ProInfoProjRelRepository) public proInfoProjRelRepo: ProInfoProjRelRepository,
    @repository(DatClassColumnMappingRepository) public datClassColumnMappingRepo: DatClassColumnMappingRepository,
    @repository(PubAccountRepository) public pubAccountRepo: PubAccountRepository,
    @repository(ProTableConfigRepository) public proTableConfigRepo: ProTableConfigRepository,
    @repository(InfLanguageRepository) public infLanguageRepo: InfLanguageRepository
  ) { }


  @get('/get-columns-of-table', {
    description: 'Get the columns of a table (digital) with column names and column mappings.',
    responses: {
      '200': {
        description: 'Ok',
        content: { 'application/json': { schema: { 'x-ts-type': GvPositiveSchemaObject } } },
      },
    },
  })
  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  getTableColumns(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
  ): Promise<GvPositiveSchemaObject> {
    return new QTableColumns(this.dataSource).query(pkProject, pkDigital)
  }

  @post('/get-table-page', {
    description: 'Get rows (with cells) of a table according to the specified columns, limit, offset and sorting.',
    responses: {
      '200': {
        description: 'Ok',
        content: { 'application/json': { schema: { 'x-ts-type': TablePageResponse } } },
      },
    },
  })
  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  async getTablePage(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkEntity', { required: true }) pkEntity: number,
    @requestBody() options: GetTablePageOptions
  ): Promise<TablePageResponse> {

    // this array contains DatColumns needed to build the query
    let datColumns: DatColumn[] = []

    // ensure at least one column is given, if no col specified, query all cols.
    options.columns = options.columns ?? [];
    if (!(options?.columns?.length >= 1)) {
      const schemaObj = await this.getTableColumns(pkProject, pkEntity)
      if (schemaObj?.dat?.column) {
        for (const col of schemaObj.dat.column) {
          if (col.pk_entity) options.columns.push(col.pk_entity.toString())
        }
      }

    }
    // ensure columns are strings
    options.columns = options.columns.map(col => col.toString())
    options.sortBy = options.sortBy.toString()

    // filter and orderby columns
    let masterColumns: string[] = [];

    // add sort-by column
    if (options.sortBy && options.sortBy !== 'pk_row') {
      masterColumns = [options.sortBy]
    }

    // add filter columns
    const filterCols = keys(options.filters);

    if (options.filters && filterCols.length > 0) {
      masterColumns = [
        ...masterColumns,
        ...filterCols.filter(col => col !== 'pk_row').map(col => col.toString())
      ]
    }

    // ensure masterColums are unique
    masterColumns = uniq(masterColumns);

    // get meta info about master columns
    if (masterColumns.length > 0) {
      datColumns = await this.getDatColumnArray(pkProject, masterColumns.map(c => parseInt(c, 10)))
    }

    options.limit = options.limit <= 100 ? options.limit : 100;

    const response = await new QTableTablePage(this.dataSource).query(pkProject, pkEntity, options, masterColumns, datColumns);

    //add languages to schema object
    const pksLanguages = uniq((response.schemaObject.inf?.lang_string ?? []).map(ls => ls.fk_language));
    if (response.schemaObject.inf) response.schemaObject.inf.language = await this.infLanguageRepo.find({ where: { or: pksLanguages.map(pk => ({ pk_languages: pk })) } })
    return response
  }



  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.NAMESPACE_MEMBER] })
  @post('/map-column', {
    description: 'Set the mapping of a column',
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject,
            },
          },
        },
      },
    },
  })
  async mapColumn(
    @param.query.number('pkNamespace', { required: true }) pkNamespace: number,
    @requestBody() body: MapColumnBody
  ): Promise<GvPositiveSchemaObject> {
    // check if the column and class exists
    await this.datColumnRepo.findById(body.pkColumn);
    await this.dfhClassRepo.findById(body.pkClass);

    // check if the column is already mapped to this class
    const actualMapping = await this.datClassColumnMappingRepo.findOne({ where: { fk_column: body.pkColumn, fk_class: body.pkClass }, });
    if (actualMapping != null) throw new HttpErrors.UnprocessableEntity('The column is already mapped to this class');

    // map the column
    const created = await this.datClassColumnMappingRepo.create({ fk_class: body.pkClass, fk_column: body.pkColumn })
    return { dat: { class_column_mapping: [created] } }
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.NAMESPACE_MEMBER] })
  @post('/unmap-column', {
    description: 'Reset the mapping of a column',
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier,
            },
          },
        },
      },
    },
  })
  async unMapColumn(
    @param.query.number('pkNamespace', { required: true }) pkNamespace: number,
    @requestBody() body: UnmapColumnBody
  ): Promise<GvSchemaModifier> {

    const theMapping = await this.checkMapping(body.pkColumn);
    const pkProject = await this.getPkProject(pkNamespace);

    const request = new QMatchedRowsFromColumn(this.dataSource);
    let count = 0, statements: Array<PkEntity> = [], infoProjRels: Array<FkProjectFkEntity> = [];
    if (body.deleteAll) {
      const deletions = await request.query(pkProject, body.pkColumn);
      // console.log(JSON.stringify(deletions)); // {"infProjRel":{"fk_entity":3022,"fk_project":375232}
      statements = deletions.map(d => ({ pk_entity: d.pkStatement }));
      infoProjRels = deletions.map(d => d.infProjRel);
    }
    else count = parseInt((await request.queryCount(pkProject, body.pkColumn))[0].count, 10);

    if (count !== 0) throw new HttpErrors.UnprocessableEntity('Can not delete the mapping, the column has cells that are matched with entities (' + count + ' matchings)');

    await this.datClassColumnMappingRepo.deleteById(theMapping.pk_entity);

    return {
      positive: {},
      negative: {
        dat: { class_column_mapping: [{ pk_entity: theMapping.pk_entity as number }] },
        inf: { statement: statements },
        pro: { info_proj_rel: infoProjRels }
      }
    }
  }


  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.NAMESPACE_MEMBER] })
  @post('/unmap-column-check', {
    description: 'Check if the mapping of a column can be removed',
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': UnMapCheckResponse,
            },
          },
        },
      },
    },
  })
  async unMapColumnCheck(
    @param.query.number('pkNamespace', { required: true }) pkNamespace: number,
    @requestBody() body: UnmapColumnBody
  ): Promise<UnMapCheckResponse> {
    await this.checkMapping(body.pkColumn);
    const pkProject = await this.getPkProject(pkNamespace);

    const request = new QMatchedRowsFromColumn(this.dataSource);
    const count = parseInt((await request.queryCount(pkProject, body.pkColumn))[0].count, 10);

    return {
      ok: count === 0,
      matchingNb: count
    }
  }



  async checkMapping(pkColumn: number) {
    const theMapping = await this.datClassColumnMappingRepo.findOne({ where: { fk_column: pkColumn }, });
    if (theMapping === null) throw new HttpErrors.UnprocessableEntity('The mapping does not exists');
    return theMapping;
  }

  async getPkProject(pkNamespace: number) {
    const namespace = await this.datNamespaceRepo.findOne({ where: { pk_entity: pkNamespace } });
    if (!namespace) throw new HttpErrors.UnprocessableEntity('The namespace does not exists')
    return namespace.fk_project;
  }


  /**
   * query array of datColumn for given array of columns
   */
  async getDatColumnArray(fkProject: number, pkColumns: number[]): Promise<DatColumn[]> {
    return new QTableDatColumns(this.dataSource).query(fkProject, pkColumns)
  }




  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/set-table-config', {
    responses: {
      '200': {
        description: 'Set the configuration of a table (for project or account scope)',
        content: { 'application/json': { schema: { 'x-ts-type': GvSchemaModifier } } }
      },
    },
  })
  async setTableConfig(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDataEntity', { required: true }) pkDataEntity: number,
    @param.query.number('accountId', { required: false }) accountId: number,
    @requestBody() config: TableConfig,
  ): Promise<GvSchemaModifier> {

    //handle config.columns
    if (config.columns) {
      for (const conf of config.columns) {
        if (isNaN(conf.fkColumn) || (conf.visible !== true && conf.visible !== false)) throw new HttpErrors.UnprocessableEntity('Column config at wrong format');
      }

      //check nb of column in config
      const digitalColumns = await this.datColumnRepo.find({ where: { fk_digital: pkDataEntity } });
      if (digitalColumns.length > config.columns.length) throw new HttpErrors.UnprocessableEntity('Too few columns provided for this digital');
      else if (digitalColumns.length < config.columns.length) throw new HttpErrors.UnprocessableEntity('Too much columns provided for this digital');

    }

    const configRow = new ProTableConfig({ fk_project: pkProject, account_id: accountId, fk_digital: pkDataEntity, config })
    const existing = await this.proTableConfigRepo.findOne({ where: { and: [{ fk_project: pkProject, account_id: accountId ?? null, fk_digital: pkDataEntity }] } });

    let resp: ProTableConfig;
    if (existing?.pk_entity) {
      await this.proTableConfigRepo.updateById(existing.pk_entity as number, configRow);
      resp = await this.proTableConfigRepo.findById(existing.pk_entity as number);
    } else resp = await this.proTableConfigRepo.create(configRow);

    return {
      positive: { pro: { table_config: [resp] } },
      negative: {}
    }
  }


  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @get('/get-table-config', {
    responses: {
      '200': {
        description: 'get the configuration of a table (for project or account scope)',
        content: { 'application/json': { schema: { 'x-ts-type': GvSchemaModifier } } }
      },
    },
  })
  async getTableConfig(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('accountId') accountId: number,
    @param.query.number('pkDataEntity', { required: true }) pkDataEntity: number,
  ): Promise<GvSchemaModifier> {
    let result: ProTableConfig | null;
    if (accountId) result = await this.proTableConfigRepo.findOne({ where: { fk_project: pkProject, account_id: accountId, fk_digital: pkDataEntity } });
    else result = await this.proTableConfigRepo.findOne({ where: { fk_project: pkProject, account_id: null, fk_digital: pkDataEntity } });

    if (result === null) return { positive: {}, negative: {} };
    else return {
      positive: { pro: { table_config: [result] } },
      negative: {}
    }
  }


}
