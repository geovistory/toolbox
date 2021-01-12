import {model, property} from '@loopback/repository';
import {AnalysisDefinition, QueryFilter, ColDef} from '..';

/**
 * Note that the colums need to match an excact object.
 */
export type TimeChartQueryCols = [{
  id: 'col_0',
  ofRootTable: true,
  preventGroupBy: true,
  defaultType: 'temporal_distribution'
}]

@model()
export class TimeChartContQueryDef {
  @property({type: QueryFilter, required: true})
  filter: QueryFilter;
  @property.array(ColDef, {required: true})
  columns: ColDef[];
}

@model()
class TimeChartContVisualSettings {
  @property()
  label: string;
}

@model()
export class TimeChartContLine {
  @property({type: TimeChartContQueryDef, required: true})
  queryDefinition: TimeChartContQueryDef;

  @property({type: TimeChartContQueryDef, required: true})
  visualizationDefinition: TimeChartContVisualSettings
}




@model()
export class AnalysisTimeChartRequest {

  @property.array({required: true, })
  lines: AnalysisDefinition[];

  @property({
    type: 'number',
    required: true,
  })
  fkProject: number;
}
