import { isValidTableInput, SysConfig, TableExportFileType } from '../../common';
import { isValidTimeChartContInput } from '../../common/validators/time-chart-cont-input.validator';
import { AnalysisTable } from './table';
import { AnalysisTimeChartCont } from './time-chart-cont';
import Ajv = require('ajv');
import { AnalysisMapAndTimeCont } from './map-and-time-cont';
import { isValidMapAndTimeContInput } from '../../common/validators/map-and-time-cont-input.validator';
import { ErrorObj } from '../utils/interfaces';

/**
 * This class handles remote methods for loopback.
 */
export class AnalysisRemotes {
  /**
   * Returns a human readable code for the given analysis type
   * @param fkAnalysisType
   */
  static getType(fkAnalysisType: number) {
    if (fkAnalysisType === SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT) return 'map-time-cont';
    if (fkAnalysisType === SysConfig.PK_ANALYSIS_TYPE__TIME_CONT) return 'time-chart-cont';
    if (fkAnalysisType === SysConfig.PK_ANALYSIS_TYPE__TABLE) return 'table';
    return undefined;
  };

  static validateProAnalysis(analysis: any): ErrorObj | null {
    const type = AnalysisRemotes.getType(analysis.fk_analysis_type)

    const r = (v: { validObj?: any, error?: Ajv.ErrorObject[] }): ErrorObj | null => {
      if (v.error) return {
        name: 'Invalid analysis definition',
        message: v.error
      }
      else return null;
    }

    if ('time-chart-cont' === type) {
      return r(isValidTimeChartContInput(analysis.analysis_definition))
    }
    else if ('table' === type) {
      return r(isValidTableInput(analysis.analysis_definition))
    }
    else if ('map-time-cont' === type) {
      return r(isValidMapAndTimeContInput(analysis.analysis_definition))
    }
    return { name: 'Anaylsis type not found.' }

  }

  constructor(private connector: any) { }
  /**
   * Runs a analysis.
   * - Validates the inputs
   * - Checks if the analyisis not to heavy for a performant response
   * - Sends the response
   */
  run(pkProject: number, fkAnalysisType: number, analysisDef: any) {
    const type = AnalysisRemotes.getType(fkAnalysisType)

    if ('time-chart-cont' === type) {
      return new AnalysisTimeChartCont(this.connector, pkProject, analysisDef).run()
    }
    else if ('table' === type) {
      return new AnalysisTable(this.connector, pkProject, analysisDef).run()
    }
    else if ('map-time-cont' === type) {
      return new AnalysisMapAndTimeCont(this.connector, pkProject, analysisDef).run()
    }

    return Error('Anaylsis type not found.');

  }

  /**
   * Runs a analysis.
   * - Validates the inputs
   * - Checks if the analyisis not to heavy for a performant response
   * - Sends the response
   */
  runAndExport(pkProject: number, fkAnalysisType: number, analysisDef: any, fileType: TableExportFileType) {
    const type = AnalysisRemotes.getType(fkAnalysisType)

    if ('table' === type) {
      return new AnalysisTable(this.connector, pkProject, analysisDef).runAndExport(fileType)
    }

    return Error('Anaylsis type not exportable.');

  }



}