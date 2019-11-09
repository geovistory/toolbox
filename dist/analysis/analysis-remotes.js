"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_chart_cont_1 = require("./time-chart-cont/time-chart-cont");
/**
 * This class handles remote methods for loopback.
 */
class AnalysisRemotes {
    constructor(connector) {
        this.connector = connector;
    }
    /**
     * Returns a human readable code for the given analysis type
     * @param fkAnalysisType
     */
    static getType(fkAnalysisType) {
        if (fkAnalysisType === 3329)
            return 'time-chart-cont';
    }
    ;
    /**
     * Runs a analysis.
     * - Validates the inputs
     * - Checks if the analyisis not to heavy for a performant response
     * - Sends the response
     */
    run(pkProject, fkAnalysisType, analysisDef) {
        if ('time-chart-cont' === AnalysisRemotes.getType(fkAnalysisType)) {
            return new time_chart_cont_1.AnalysisTimeChartCont(this.connector, pkProject, analysisDef).run();
        }
    }
}
exports.AnalysisRemotes = AnalysisRemotes;
//# sourceMappingURL=analysis-remotes.js.map