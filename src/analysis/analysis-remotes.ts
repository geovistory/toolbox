import { AnalysisTimeChartCont } from './time-chart-cont/time-chart-cont';

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
  };


  constructor(private connector) { }
  /**
   * Runs a analysis.
   * - Validates the inputs
   * - Checks if the analyisis not to heavy for a performant response
   * - Sends the response
   */
  run(pkProject: number, fkAnalysisType: number, analysisDef) {
    if ('time-chart-cont' === AnalysisRemotes.getType(fkAnalysisType)) {
      return new AnalysisTimeChartCont(this.connector, pkProject, analysisDef).run()
    }
  }

}
