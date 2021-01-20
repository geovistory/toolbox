import {model, property} from '@loopback/repository';
import {TimeChartContLine} from '..';

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
export class AnalysisTimeChartRequest {

  @property.array(TimeChartContLine, {required: true, })
  lines: TimeChartContLine[];

  @property({
    type: 'number',
    required: true,
  })
  fkProject: number;
}
