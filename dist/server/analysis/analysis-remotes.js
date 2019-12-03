"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const time_chart_cont_input_validator_1 = require("../../common/validators/time-chart-cont-input.validator");
const table_1 = require("./table");
const time_chart_cont_1 = require("./time-chart-cont");
const map_and_time_cont_1 = require("./map-and-time-cont");
const map_and_time_cont_input_validator_1 = require("../../common/validators/map-and-time-cont-input.validator");
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
        if (fkAnalysisType === common_1.SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT)
            return 'map-time-cont';
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
        else if ('map-time-cont' === type) {
            return r(map_and_time_cont_input_validator_1.isValidMapAndTimeContInput(analysis.analysis_definition));
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
        else if ('map-time-cont' === type) {
            return new map_and_time_cont_1.AnalysisMapAndTimeCont(this.connector, pkProject, analysisDef).run();
        }
        return Error('Anaylsis type not found.');
    }
    /**
     * Runs a analysis.
     * - Validates the inputs
     * - Checks if the analyisis not to heavy for a performant response
     * - Sends the response
     */
    runAndExport(pkProject, fkAnalysisType, analysisDef, fileType) {
        const type = AnalysisRemotes.getType(fkAnalysisType);
        if ('table' === type) {
            return new table_1.AnalysisTable(this.connector, pkProject, analysisDef).runAndExport(fileType);
        }
        return Error('Anaylsis type not exportable.');
    }
}
exports.AnalysisRemotes = AnalysisRemotes;
//# sourceMappingURL=analysis-remotes.js.map