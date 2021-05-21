/* eslint-disable @typescript-eslint/camelcase */
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { tags } from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import { model, property, repository } from '@loopback/repository';
import { get, HttpErrors, param, post, requestBody } from '@loopback/rest';
import { NumberOfAutoScalingGroups } from 'aws-sdk/clients/autoscaling';
import { keys, uniq } from 'ramda';
import { Roles } from '../components/authorization/keys';
import { QMatchedRowsFromColumn } from '../components/query/q-matched-rows-from-column';
import { QTableColumns } from '../components/query/q-table-columns';
import { QTableDatColumns } from '../components/query/q-table-dat-columns';
import { GetTablePageOptions, QTableTablePage, TablePageResponse } from '../components/query/q-table-page';
import { QTablesCell } from '../components/query/tables/q-tables-cells';
import { QTablesRow } from '../components/query/tables/q-tables-rows';
import { Postgres1DataSource } from '../datasources';
import { ProTableConfig, TabCell, TableConfig, TabRow } from '../models';
import { DatColumn } from '../models/dat-column.model';
import { FkProjectFkEntity, PkEntity } from '../models/gv-negative-schema-object.model';
import { GvPositiveSchemaObject } from '../models/gv-positive-schema-object.model';
import { GvSchemaModifier } from '../models/gv-schema-modifier.model';
import { DatClassColumnMappingRepository, DatColumnRepository, DatDigitalRepository, DatNamespaceRepository, DatTextPropertyRepository, DfhClassRepository, InfLanguageRepository, ProInfoProjRelRepository, ProTableConfigRepository, PubAccountRepository } from '../repositories';

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

@model()
export class ColumnName {
  @property() pkColumn: number;
  @property() visible: boolean;
  @property() name: string;
  @property() type?: 'string' | 'number';
  @property() position?: number;
}

@model()
export class ColumnNames {
  @property.array(ColumnName) names: Array<ColumnName>
}

@model()
export class TabCells {
  @property.array(TabCell) cells: Array<TabCell>
}

/**
 * A controller to get data from and about tables (digitals)
 */
@tags('table')
export class TableController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @repository(DatColumnRepository) public datColumnRepo: DatColumnRepository,
    @repository(DatDigitalRepository) public datDigitalRepository: DatDigitalRepository,
    @repository(DfhClassRepository) public dfhClassRepo: DfhClassRepository,
    @repository(DatNamespaceRepository) public datNamespaceRepo: DatNamespaceRepository,
    @repository(DatTextPropertyRepository) public datTextPropertyRepo: DatTextPropertyRepository,
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
    if (options.sortBy && options.sortBy !== 'index') {
      masterColumns = [options.sortBy]
    }

    // add filter columns
    const filterCols = keys(options.filters);

    if (options.filters && filterCols.length > 0) {
      masterColumns = [
        ...masterColumns,
        ...filterCols.filter(col => col !== 'index').map(col => col.toString())
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
      console.log('digitalColumns.length', digitalColumns.length)
      console.log('config.columns.length', config.columns.length)
      console.log('digitalColumns')
      console.log(digitalColumns.map(col => col.pk_entity));
      console.log('config.columns')
      console.log(config.columns.map(col => col.fkColumn));
      if (digitalColumns.length > config.columns.length) throw new HttpErrors.UnprocessableEntity('Too few columns provided for this digital');
      else if (digitalColumns.length < config.columns.length) throw new HttpErrors.UnprocessableEntity('Too much columns provided for this digital');

    }

    const configRow = new ProTableConfig({ fk_project: pkProject, account_id: accountId, fk_digital: pkDataEntity, config })
    const existing = await this.proTableConfigRepo.findOne({ where: { and: [{ fk_project: pkProject, account_id: accountId ?? null, fk_digital: pkDataEntity }] } });

    if (existing?.pk_entity) {
      await this.proTableConfigRepo.updateById(existing.pk_entity as number, configRow);
      await this.proTableConfigRepo.findById(existing.pk_entity as number);
    } else await this.proTableConfigRepo.create(configRow);

    return this.getTableConfig(pkProject, accountId, pkDataEntity);
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

    if (result === null) throw new HttpErrors.UnprocessableEntity('Impossible error: table should have a table config at this point');

    return {
      positive: { pro: { table_config: [result] } },
      negative: {}
    }
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/update-columns', {
    responses: {
      '200': {
        description: 'Update the name of columns',
        content: { 'application/json': { schema: { 'x-ts-type': GvSchemaModifier } } }
      },
    },
  })
  async updateColumn(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
    @param.query.number('accountId') accountId: number,
    @param.query.number('fkLanguage') fkLanguage: number,
    @requestBody() body: ColumnNames
  ): Promise<GvSchemaModifier> {

    const tableConfig = (await this.proTableConfigRepo.findOne({ where: { fk_project: pkProject, account_id: accountId, fk_digital: pkDigital } }))?.config;
    if (!tableConfig) throw new HttpErrors.UnprocessableEntity('Table config does not exists for this table (impossible error)');

    for (const col of body.names) {
      if (col.pkColumn < 0) {//the column is new:
        if (!col.type) throw new HttpErrors.UnprocessableEntity('New column has no type');
        const datNamespace = await this.datNamespaceRepo.findOne({ where: { fk_project: pkProject } })
        if (!datNamespace) throw new HttpErrors.UnprocessableEntity('Namespace does not exists for this digital');
        //create the column
        const datCol = await this.datColumnRepo.create({ fk_digital: pkDigital, fk_data_type: col.type === 'string' ? 3292 : 3293, fk_column_content_type: 3291, fk_namespace: datNamespace.pk_entity })
        await this.datTextPropertyRepo.create({ fk_entity: datCol.pk_entity, string: col.name, fk_system_type: 3295, fk_language: fkLanguage, fk_namespace: datNamespace.pk_entity });
        if (!datCol.pk_entity) throw new HttpErrors.UnprocessableEntity('Column creation failed (impossible error)');
        // put it at correct index
        tableConfig?.columns?.push({ fkColumn: datCol.pk_entity, visible: col.visible })
        if (tableConfig?.columns && col.position) tableConfig.columns.splice(col.position, 0, tableConfig.columns.splice(tableConfig?.columns?.length - 1, 1)[0])

      } else { // the column already exists
        const datCol = await this.datColumnRepo.findOne({ where: { pk_entity: col.pkColumn } })
        if (datCol?.fk_digital && datCol.fk_digital !== pkDigital) throw new HttpErrors.UnprocessableEntity('Column is not in the digital');
        const tp = await this.datTextPropertyRepo.findOne({ where: { fk_entity: col.pkColumn } });
        if (!tp) throw new HttpErrors.UnprocessableEntity('Unknown column');

        if (tp.string !== col.name) { // the column label has changed
          tp.string = col.name;
          await this.datTextPropertyRepo.updateById(tp.pk_entity, tp);
        }

        if (col.position === undefined || isNaN(col.position)) continue;
        if (!tableConfig || !tableConfig.columns) continue;
        if (col.position >= tableConfig?.columns?.length) throw new HttpErrors.UnprocessableEntity('Position is not valid: too high');

        const oldIndex = tableConfig?.columns?.findIndex(c => c.fkColumn === col.pkColumn)
        if (oldIndex !== col.position) { // the column has moved
          [tableConfig.columns[col.position], tableConfig.columns[oldIndex]] = [tableConfig.columns[oldIndex], tableConfig.columns[col.position]]; // exchange new position and old position
        }
        tableConfig.columns[col.position].visible = col.visible;
      }
    }

    await this.setTableConfig(pkProject, pkDigital, accountId, tableConfig)

    const newConfig = (await this.getTableConfig(pkProject, accountId, pkDigital)).positive;
    const newColumns = await this.getTableColumns(pkProject, pkDigital);

    return {
      positive: { ...newConfig, ...newColumns },
      negative: {}
    }
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/insert-or-update-cells', {
    responses: {
      '200': {
        description: 'Update the content of a cell. if the cell does not exists, create it',
        content: { 'application/json': { schema: { 'x-ts-type': TabCells } } }
      },
    },
  })
  async insertOrUpdateCells(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
    @requestBody() body: TabCells
  ): Promise<TabCells> {
    const fakeRepoCell = new QTablesCell(this.dataSource);
    const fakeRepoRow = new QTablesRow(this.dataSource);

    const toUpdate: Array<TabCell> = [];
    const toCreate: Array<TabCell> = [];

    //before updating anything in db, check if the columns are in the digital
    for (const cell of body.cells) {
      //check presence
      if (!cell.fk_column) throw new HttpErrors.UnprocessableEntity('fkColumn is missing on cell');
      if (!cell.fk_row) throw new HttpErrors.UnprocessableEntity('fkRow is missing on cell');
      if (!cell.string_value && !cell.numeric_value) throw new HttpErrors.UnprocessableEntity('Cell has no value');
      //check digital of col and row
      const col = await this.datColumnRepo.findOne({ where: { pk_entity: cell.fk_column } });
      if (!col || col.fk_digital !== pkDigital) throw new HttpErrors.UnprocessableEntity('You can not add a cell to this column');
      const row = await fakeRepoRow.getRow(pkDigital, cell.fk_row);
      if (!row || row.fk_digital !== pkDigital) throw new HttpErrors.UnprocessableEntity('You can not add a cell to this row');

      //if cell already exists and pkCell is filled, check constitency
      const existingCell = await fakeRepoCell.getCellFromColRow(cell.fk_column, cell.fk_row);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (cell.pk_cell && (!existingCell || parseInt(existingCell.pk_cell as any) !== cell.pk_cell)) throw new HttpErrors.UnprocessableEntity('Inconstitency between pkCell and fkColumn/fkRow');

      //is the cell in the digital?
      if (existingCell?.fk_digital && existingCell.fk_digital !== pkDigital) throw new HttpErrors.UnprocessableEntity('Cell already exists and is not in the digital');

      //prepare to update
      cell.fk_digital = pkDigital;
      if (existingCell) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell.pk_cell = parseInt(existingCell.pk_cell as any)
        toUpdate.push(cell);
      } else toCreate.push(cell);
    }

    //when we have checked everything, we can make the modifications in db
    for (const cell of toUpdate) await fakeRepoCell.updateCell(cell);
    for (const cell of toCreate) await fakeRepoCell.createCell(cell);

    return { cells: toUpdate.concat(toCreate) };
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/new-row', {
    responses: {
      '200': {
        description: 'Add a new row at specified position. And returns it',
        content: { 'application/json': { schema: { 'x-ts-type': TabRow } } }
      },
    },
  })
  async newRow(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
    @param.query.number('index', { required: true }) index: number,
  ): Promise<TabRow> {
    const fakeRepo = new QTablesRow(this.dataSource);

    //check if the digital exists
    await this.datDigitalRepository.findById(pkDigital);

    return fakeRepo.createNewRow(pkDigital, index);
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/move-row-to-index', {
    responses: {
      '200': {
        description: 'Move a row from his index to another one',
        content: { 'application/json': { schema: { 'x-ts-type': TabRow } } }
      },
    },
  })
  async moveRow(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
    @param.query.number('pkRow', { required: true }) pkRow: number,
    @param.query.number('index', { required: true }) index: number
  ): Promise<TabRow> {
    const fakeRepo = new QTablesRow(this.dataSource);

    //check if the digital and the row exists
    await this.datDigitalRepository.findById(pkDigital);
    if (!await fakeRepo.getRow(pkDigital, pkRow)) throw new HttpErrors.UnprocessableEntity('Unknown row');

    return fakeRepo.moveRow(pkDigital, pkRow, index);
  }

  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER, Roles.DATAENTITY_IN_NAMESPACE] })
  @post('/delete-row', {
    responses: {
      '200': {
        description: 'Delete a row',
        content: { 'application/json': { schema: { 'x-ts-type': Number } } }
      },
    },
  })
  async deleteRow(@param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
    @param.query.number('pkRow', { required: true }) pkRow: number,
  ): Promise<NumberOfAutoScalingGroups> {
    const fakeRepoRow = new QTablesRow(this.dataSource);
    const fakeRepoCell = new QTablesCell(this.dataSource);

    //check if the digital and the row exists
    await this.datDigitalRepository.findById(pkDigital);
    if (!await fakeRepoRow.getRow(pkDigital, pkRow)) throw new HttpErrors.UnprocessableEntity('Unknown row');

    const relatedCells = await fakeRepoCell.getAllCellsInRow(pkDigital, pkRow);
    for (const cell of relatedCells) {
      await fakeRepoCell.deleteCell(cell.fk_digital as number, cell.pk_cell as number)
    }
    return fakeRepoRow.deleteRow(pkDigital, pkRow);
  }



}
