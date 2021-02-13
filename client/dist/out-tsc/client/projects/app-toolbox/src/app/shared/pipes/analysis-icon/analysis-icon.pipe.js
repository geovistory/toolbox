import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
let AnalysisIconPipe = 
/**
 * Returns name of svgIcon for given fk_analysis_type
 */
class AnalysisIconPipe {
    transform(pkAnalysisType) {
        const pk = pkAnalysisType;
        if (pk == SysConfig.PK_ANALYSIS_TYPE__TABLE)
            return 'table-large';
        else if (pk == SysConfig.PK_ANALYSIS_TYPE__TIME_CONT)
            return 'chart-bell-curve';
        else if (pk == SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT)
            return 'map-clock';
        else
            return undefined;
    }
};
AnalysisIconPipe = tslib_1.__decorate([
    Pipe({
        name: 'analysisIcon'
    })
    /**
     * Returns name of svgIcon for given fk_analysis_type
     */
], AnalysisIconPipe);
export { AnalysisIconPipe };
//# sourceMappingURL=analysis-icon.pipe.js.map