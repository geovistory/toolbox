"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const time_chart_cont_input_validator_1 = require("../../common/validators/time-chart-cont-input.validator");
const table_1 = require("./table/table");
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
        if (fkAnalysisType === common_1.SysConfig.PK_ANALYSIS_TYPE__TIME_CONT)
            return 'time-chart-cont';
        if (fkAnalysisType === common_1.SysConfig.PK_ANALYSIS_TYPE__TABLE)
            return 'table';
        return undefined;
    }
    ;
    static validateProAnalysis(analysis) {
        const type = AnalysisRemotes.getType(analysis.fk_analysis_type);
        const r = (v) => {
            if (v.error)
                return {
                    name: 'Invalid analysis definition',
                    message: v.error
                };
            else
                return null;
        };
        if ('time-chart-cont' === type) {
            return r(time_chart_cont_input_validator_1.isValidTimeChartContInput(analysis.analysis_definition));
        }
        else if ('table' === type) {
            return r(common_1.isValidTableInput(analysis.analysis_definition));
        }
        return { name: 'Anaylsis type not found.' };
    }
    /**
     * Runs a analysis.
     * - Validates the inputs
     * - Checks if the analyisis not to heavy for a performant response
     * - Sends the response
     */
    run(pkProject, fkAnalysisType, analysisDef) {
        const type = AnalysisRemotes.getType(fkAnalysisType);
        if ('time-chart-cont' === type) {
            return new time_chart_cont_1.AnalysisTimeChartCont(this.connector, pkProject, analysisDef).run();
        }
        else if ('table' === type) {
            return new table_1.AnalysisTable(this.connector, pkProject, analysisDef).run();
        }
        return Error('Anaylsis type not found.');
    }
}
exports.AnalysisRemotes = AnalysisRemotes;
//# sourceMappingURL=analysis-remotes.js.map