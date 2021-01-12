/* eslint-disable @typescript-eslint/camelcase */
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {post, requestBody, RequestContext, RestBindings, RestServer, HttpErrors} from '@loopback/rest';
import * as json2csv from 'json2csv';
import {QAnalysisBase} from '../components/query/analysis/q-analysis-base';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {AnalysisTableExportRequest, AnalysisTableResponse, AnalysisTableRow, ColDef, TableExportFileType} from '../models';
import {AnalysisTableExportResponse} from '../models/analysis/analysis-table-export-response.model';
import {AnalysisTableRequest} from '../models/analysis/analysis-table-request.model';
import {AnalysisMapResponse} from '../models/analysis/analysis-map-response.model';
import {AnalysisMapRequest} from '../models/analysis/analysis-map-request.model';
import {QAnalysisMap} from '../components/query/analysis/q-analysis-map';




@tags('analysis')
export class AnalysisController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
    @inject(RestBindings.SERVER) private restServer: RestServer,
    @inject(RestBindings.Http.CONTEXT) private requestContext: RequestContext,
  ) { }


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
    const fullCount = await new QAnalysisBase(this.dataSource)
      .countResultingRows(req.analysisDefinition.queryDefinition, req.fkProject);

    // get rows
    const rows = await new QAnalysisBase(this.dataSource)
      .query<AnalysisTableRow[]>(req.analysisDefinition.queryDefinition, req.fkProject)

    const res: AnalysisTableResponse = {
      full_count: fullCount,
      rows: rows
    }

    return res
  }




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
    const fullCount = await new QAnalysisBase(this.dataSource)
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

    } else if (fileType === 'csv') {

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

    const flatResults = rows.map(obj => {
      const flat: {[key: string]: number | string | object} = {};

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          const colLabel = columnLabelMap[key]

          if (typeof element === 'object') {
            if (Array.isArray(element)) {
              flat[colLabel] = element.length;
              fieldObj[colLabel] = true;
            }
            else if (
              Object.prototype.hasOwnProperty.call(element, 'entity_label')
            ) {
              flat[colLabel] = [element.class_label, element.entity_label].filter(x => !!x).join(' ');
              fieldObj[colLabel] = true;
              // ignore {} objects
            }
          } else {
            flat[colLabel] = element;
            fieldObj[colLabel] = true;
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
}
