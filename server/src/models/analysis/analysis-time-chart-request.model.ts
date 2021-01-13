import {model, property} from '@loopback/repository';
import {TimeChartContQueryDef} from '..';

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
class TimeChartContVisualSettings {
  @property()
  label: string;
}

@model()
export class TimeChartContLine {
  @property({type: TimeChartContVisualSettings, required: true})
  visualizationDefinition: TimeChartContVisualSettings;

  @property({type: TimeChartContQueryDef, required: true})
  queryDefinition: TimeChartContQueryDef;

}




@model()
export class AnalysisTimeChartRequest {

  @property.array(TimeChartContLine, {required: true, })
  lines: TimeChartContLine[];

  @property({
    type: 'number',
    required: true,
  })
  fkProject: number;
}
