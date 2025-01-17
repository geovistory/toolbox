import { Pipe, PipeTransform } from '@angular/core';
import { SysConfig } from "@kleiolab/lib-config";

@Pipe({
    name: 'analysisIcon',
    standalone: true
})
/**
 * Returns name of svgIcon for given fk_analysis_type
 */
export class AnalysisIconPipe implements PipeTransform {

  transform(pkAnalysisType: number): string {
    const pk = pkAnalysisType;
    if (pk == SysConfig.PK_ANALYSIS_TYPE__TABLE) return 'table-large'
    else if (pk == SysConfig.PK_ANALYSIS_TYPE__TIME_CONT) return 'chart-bell-curve'
    else if (pk == SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT) return 'map-clock'
    else return undefined
  }

}
