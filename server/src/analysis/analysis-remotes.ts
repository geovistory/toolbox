import { ErrorObj } from './analysis';
import { isValidTableQueryRes } from './table/query-result/table-query-res.validator';
import { AnalysisTable } from './table/table';
import { isValidTimeChartContInput } from './time-chart-cont/input/time-chart-cont-input.validator';
import { AnalysisTimeChartCont } from './time-chart-cont/time-chart-cont';
import Ajv = require('ajv');

/**
 * This class handles remote methods for loopback.
 */
export class AnalysisRemotes {
  /**
   * Returns a human readable code for the given analysis type
   * @param fkAnalysisType
   */
  static getType(fkAnalysisType) {
    if (fkAnalysisType === 3329) return 'time-chart-cont';
    if (fkAnalysisType === 3330) return 'table';
  };

  static validateProAnalysis(analysis): { error: ErrorObj } | null {
    const type = AnalysisRemotes.getType(analysis.fk_analysis_type)

    const r = (v: { validObj?: any, error?: Ajv.ErrorObject[] }): { error: ErrorObj } | null => {
      if (v.error) return {
        error: {
          title: 'Invalid query results.',
          message: v.error
        }
      }
      else return null;
    }

    if ('time-chart-cont' === type) {
      return r(isValidTimeChartContInput(analysis.analysis_definition))
    }
    else if ('table' === type) {
      return r(isValidTableQueryRes(analysis.analysis_definition))
    } else {
      Error('Anaylsis type not found.');
    }
  }


  constructor(private connector) { }
  /**
   * Runs a analysis.
   * - Validates the inputs
   * - Checks if the analyisis not to heavy for a performant response
   * - Sends the response
   */
  run(pkProject: number, fkAnalysisType: number, analysisDef) {
    const type = AnalysisRemotes.getType(fkAnalysisType)

    if ('time-chart-cont' === type) {
      return new AnalysisTimeChartCont(this.connector, pkProject, analysisDef).run()
    }
    else if ('table' === type) {
      return new AnalysisTable(this.connector, pkProject, analysisDef).run()
    } else {
      Error('Anaylsis type not found.');
    }
  }



}
