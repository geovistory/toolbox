import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {Count, repository} from '@loopback/repository';
import {get, HttpErrors, param, post, put, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import * as json2csv from 'json2csv';
import {Roles} from '../components/authorization';
import {QAnalysisCount} from '../components/query/analysis/q-analysis-count';
import {QAnalysisMap} from '../components/query/analysis/q-analysis-map';
import {QAnalysisTable} from '../components/query/analysis/q-analysis-table';
import {QAnalysisTime} from '../components/query/analysis/q-analysis-time';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {AnalysisTableExportRequest, AnalysisTableResponse, AnalysisTableRow, ColDef, ProAnalysis, ProAnalysisRelations, TableExportFileType, WarStatementObjectValue} from '../models';
import {AnalysisMapRequest} from '../models/analysis/analysis-map-request.model';
import {AnalysisMapResponse} from '../models/analysis/analysis-map-response.model';
import {AnalysisTableExportResponse} from '../models/analysis/analysis-table-export-response.model';
import {AnalysisTableRequest} from '../models/analysis/analysis-table-request.model';
import {AnalysisTimeChartRequest} from '../models/analysis/analysis-time-chart-request.model';
import {AnalysisTimeChartResponse, ChartLine} from '../models/analysis/analysis-time-chart-response.model';
import {GvPositiveSchemaObject} from '../models/gv-positive-schema-object.model';
import {ProAnalysisRepository} from '../repositories';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';
import {SysConfigController} from './backoffice/sys-config.controller';




@tags('analysis')
export class AnalysisController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @repository(ProAnalysisRepository) protected proAnalysisRepo: ProAnalysisRepository,
    @inject('controllers.SysConfigController') protected sysConfigController: SysConfigController,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
  ) { }



  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @post('analysis/table-run', {
    description: 'Run the analysis of type table',
    responses: {
      '200': {
        description: 'Analysis has been successfully run.',
        content: {'application/json': {schema: {'x-ts-type': AnalysisTableResponse}}},
      },
    },
  })
  async tableRun(
    @requestBody() req: AnalysisTableRequest,
  ): Promise<AnalysisTableResponse> {


    // check feasibility
    if (!req.analysisDefinition.queryDefinition) throw new Error('queryDefinition is required');

    // count rows
    const fullCount = await new QAnalysisCount(this.dataSource)
      .countResultingRows(req.analysisDefinition.queryDefinition, req.fkProject);

    // get rows
    const rows = await new QAnalysisTable(this.dataSource, this.sysConfigController)
      .query(req.analysisDefinition.queryDefinition, req.fkProject)

    const res: AnalysisTableResponse = {
      full_count: fullCount,
      rows: rows
    }

    return res
  }



  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @post('analysis/table-export', {
    description: 'Export the analysis of type table',
    responses: {
      '200': {
        description: 'Analysis has been successfully run.',
        content: {'application/json': {schema: {'x-ts-type': AnalysisTableExportResponse}}},
      },
    },
  })
  async tableExport(
    @requestBody() req: AnalysisTableExportRequest,
  ): Promise<AnalysisTableExportResponse> {

    const {fileType, ...runRequest} = req
    const d = await this.tableRun(runRequest)

    const rows = d.rows;
    const columns = req.analysisDefinition.queryDefinition?.columns ?? [];

    return this.convertToFile(columns, rows, fileType)
  }





  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @post('analysis/map-run', {
    description: 'Run the analysis of type map',
    responses: {
      '200': {
        description: 'Analysis has been successfully run.',
        content: {'application/json': {schema: {'x-ts-type': AnalysisMapResponse}}},
      },
    },
  })
  async mapRun(
    @requestBody() req: AnalysisMapRequest,
  ): Promise<AnalysisMapResponse> {


    if (!req.analysisDefinition.queryDefinition) throw new Error('queryDefinition is required');

    // count rows
    const fullCount = await new QAnalysisCount(this.dataSource)
      .countResultingRows(req.analysisDefinition.queryDefinition, req.fkProject);

    // check feasibility
    if (fullCount > 1000) {
      throw new HttpErrors.PayloadTooLarge('Result is too big.')
    }

    // get geoPlaces
    const geoPlaces = await new QAnalysisMap(this.dataSource)
      .queryMap(req.analysisDefinition.queryDefinition, req.fkProject)

    return {geoPlaces}
  }

  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @post('analysis/time-chart-run', {
    description: 'Run the analysis of type time-chart',
    responses: {
      '200': {
        description: 'Analysis has been successfully run.',
        content: {'application/json': {schema: {'x-ts-type': AnalysisTimeChartResponse}}},
      },
    },
  })
  async timeChartRun(
    @requestBody() req: AnalysisTimeChartRequest,
  ): Promise<AnalysisTimeChartResponse> {
    const defaultResponse = {
      activeLine: 0,
      chartLines: []
    }

    if (req.lines.length > 100) throw new Error('Too many lines');
    else if (req.lines.length < 1) return defaultResponse;

    // count items per line
    const counts = await Promise.all(req.lines.map(item => {
      return new QAnalysisCount(this.dataSource).countResultingRows(item.queryDefinition, req.fkProject)
    }))


    // check feasibility
    counts.forEach((count, i) => {
      if (count > 100000) {
        throw new Error(`Your query gives too large result. Please narrow down the filter for line nr. ${i + 1}`);
      }
    })

    // get data
    const lines = await Promise.all(req.lines.map(item => {
      return new QAnalysisTime(this.dataSource).query(item.queryDefinition, req.fkProject)
    }))
    const chartLines: ChartLine[] = lines.map((line, i) => ({
      label: req.lines[i].visualizationDefinition.label,
      linePoints: line?.[0].linePoints
    }))
    return {
      activeLine: 0,
      chartLines
    }
  }

  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @get('analysis/get-version', {
    description: 'Get a ProAnalysis version. If no version specified, latest version is returned.',
    responses: {
      '200': {
        description: 'Ok.',
        content: {'application/json': {schema: {'x-ts-type': GvPositiveSchemaObject}}},
      },
    },
  })
  async getVersion(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('pkEntity') pkEntity: number,
    @param.query.number('version') version: number,
  ): Promise<GvPositiveSchemaObject> {
    let res: (ProAnalysis & ProAnalysisRelations) | null
    if (!version) {
      res = await this.proAnalysisRepo.findOne({
        where: {
          pk_entity: {eq: pkEntity},
          fk_project: {eq: pkProject}
        }
      })
    } else {
      const b = new SqlBuilderLb4Models(this.dataSource)
      b.sql = `
      SELECT ${b.createSelect('t1', ProAnalysis.definition)}
      FROM projects.analysis t1
      WHERE t1.pk_entity = ${b.addParam(pkEntity)}
      AND t1.fk_project = ${b.addParam(pkProject)}
      AND t1.entity_version = ${b.addParam(version)}
      UNION
      SELECT ${b.createSelect('t1', ProAnalysis.definition)}
      FROM projects.analysis_vt t1
      WHERE t1.pk_entity = ${b.addParam(pkEntity)}
      AND t1.fk_project = ${b.addParam(pkProject)}
      AND t1.entity_version = ${b.addParam(version)}
      `
      res = (await b.execute<ProAnalysis[]>())?.[0]
    }
    if (!res) throw new HttpErrors.NotFound()
    return {pro: {analysis: [res]}}
  }

  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @get('analysis/of-project', {
    description: 'Get all ProAnalysis of a project.',
    responses: {
      '200': {
        description: 'Ok.',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject,
            }
          }
        },
      },
    },
  })
  async ofProject(
    @param.query.number('pkProject', {required: true}) pkProject: number
  ): Promise<GvPositiveSchemaObject> {
    const analysis = await this.proAnalysisRepo.find({
      where: {
        fk_project: {eq: pkProject}
      }
    })
    return {pro: {analysis}}
  }

  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @put('analysis/bulk-upsert', {
    description: 'Update or insert array of ProAnalysis of a project.',
    responses: {
      '200': {
        description: 'Ok.',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject,
            }
          }
        },
      },
    },
  })
  async bulkUpsert(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              'x-ts-type': ProAnalysis,
            },
          }
        }
      },
    }) items: ProAnalysis[],
  ): Promise<GvPositiveSchemaObject> {
    const accountId = this.user[securityId];
    const promiseArray = items.map(item => {
      item.fk_last_modifier = parseInt(accountId, 10)
      if (item.fk_project !== pkProject) {
        throw new HttpErrors.Unauthorized(`It is not allowed to upsert a ProAnalysis with different fk_project (${item.fk_project}) from authorizes pkProject (${pkProject}).`);
      } return this.proAnalysisRepo.upsert(item);
    });
    const analysis = await Promise.all(promiseArray)
    return {pro: {analysis}}
  }


  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @put('analysis/bulk-delete',)
  async bulkDelete(
    @param.query.number('pkProject') pkProject: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'number',
            },
          }
        }
      },
    }) pkEntities: number[],
  ): Promise<Count> {
    return this.proAnalysisRepo.deleteAll({
      pk_entity: {inq: pkEntities},
      fk_project: {eq: pkProject}
    });

    // Todo: return GvNegativeSchemaObject instead
  }




  // HELPERS

  /**
   * Converts table to file
   * @param columns
   * @param rows
   * @param fileType
   */
  private convertToFile(columns: ColDef[], rows: AnalysisTableRow[], fileType?: TableExportFileType): AnalysisTableExportResponse {

    if (fileType === 'json') {
      return {
        res: JSON.stringify({
          columns: this.getColumnLabelMap(columns),
          rows: rows
        }, null, 2)
      };

    }
    else if (fileType === 'csv') {

      const {fields, data} = this.flattenResults(rows, columns);
      try {
        const parser = new json2csv.Parser({fields});
        const csv = parser.parse(data);
        return {res: csv};
      } catch (err) {
        throw new Error(JSON.stringify({
          error: {
            name: 'Error when creating csv.',
            message: err
          }
        }, null, 2))
      }

    } else if (fileType === 'xls') {
      const {fields, data} = this.flattenResults(rows, columns);
      try {
        const parser = new json2csv.Parser({fields, excelStrings: true});
        const xls = parser.parse(data);
        return {res: xls};
      } catch (err) {
        throw new Error(JSON.stringify({
          error: {
            name: 'Error when creating xls.',
            message: err
          }
        }, null, 2))
      }
    } else {
      throw new Error(`Unsupported file type for exporting table: ${fileType}`)
    }
  }

  private getColumnLabelMap(columns: ColDef[]) {
    const columnLabelMap: {[colId: string]: string} = {}

    columns.forEach(col => {
      columnLabelMap[col.id] = col?.label ? col.label : col.id
    })
    return columnLabelMap
  }

  private flattenResults(rows: AnalysisTableRow[], columns: ColDef[]) {
    const fieldObj: {[key: string]: boolean} = {};
    const columnLabelMap = this.getColumnLabelMap(columns)

    const flatResults = rows.map(row => {
      const flat: {[key: string]: number | string | object} = {};

      for (const colId in row) {
        if (Object.prototype.hasOwnProperty.call(row, colId)) {
          const cell = row[colId];
          if (cell) {

            const colLabel = columnLabelMap[colId]

            // from joined table (zero to many)
            if (cell.entities) {
              flat[colLabel] = cell.entities.length;
              fieldObj[colLabel] = true;
            }
            else if (cell.values) {
              // add additional column with count of items
              const countColLabel = colLabel + ' (count)';
              flat[countColLabel] = cell.values.length;
              fieldObj[countColLabel] = true;

              // add first value
              flat[colLabel] = cell.values.length ? this.transformValueToLabel(cell.values[0].value) : '';
              fieldObj[colLabel] = true;
            }

            // from root table (zero or one)
            else if (cell.entity) {
              flat[colLabel] = cell.entity?.entity_label ?? '';
              fieldObj[colLabel] = true;
            }
            else if (cell.entityId) {
              flat[colLabel] = cell.entityId;
              fieldObj[colLabel] = true;
            }
            else if (cell.entityLabel) {
              flat[colLabel] = cell.entityLabel;
              fieldObj[colLabel] = true;
            }
            else if (cell.entityClassLabel) {
              flat[colLabel] = cell.entityClassLabel;
              fieldObj[colLabel] = true;
            }
            else if (cell.entityTypeLabel) {
              flat[colLabel] = cell.entityTypeLabel;
              fieldObj[colLabel] = true;
            }
            else if (cell.entityTypeId) {
              flat[colLabel] = cell.entityTypeId;
              fieldObj[colLabel] = true;
            }
            else if (cell.value) {
              const v = cell.value.value
              if (v.string) {
                flat[colLabel] = v.string.string;
              }
              else if (v.geometry) {
                flat[colLabel] = v.geometry.geoJSON.coordinates.join(', ');
              }
              else if (v.language) {
                flat[colLabel] = v.language.label;
              }
              else if (v.timePrimitive) {
                flat[colLabel] = v.timePrimitive.label;
              }
              else if (v.langString) {
                flat[colLabel] = v.langString.string;
              }
              else if (v.dimension) {
                flat[colLabel] = v.dimension.numericValue;
              }

              fieldObj[colLabel] = true;
            }
            // else {
            //   flat[colLabel] = cell;
            //   fieldObj[colLabel] = true;
            // }
          }
        }
      }
      return flat;
    });


    return {
      fields: Object.keys(fieldObj),
      data: flatResults,
    };
  };


  transformValueToLabel(v: WarStatementObjectValue): string {
    if (!v) return ''
    else if (v.dimension) return v.dimension.numericValue.toString()
    else if (v.geometry) return v.geometry.geoJSON.coordinates.join(', ')
    else if (v.language) return v.language.label
    else if (v.string) return v.string.string
    else if (v.langString) return v.langString.string
    else if (v.timePrimitive) return v.timePrimitive.label
    else return ''
  }
}
