import { QueryFilter } from '../../../server/src/query/query-filter';

/**
 * Input type definition for analysis of type:
 * time-chart-cont
 */
export interface TimeChartContInput {
  lines: TimeChartContLine[]
}
export interface TimeChartContLine {
  queryDefinition: TimeChartContQueryDef;
  visualizationDefinition: {
    label: string
  }
}

/**
 * Note that the colums need to match an excact object.
 */
type TimeChartQueryCols = [{
  id: 'col_0',
  ofRootTable: true,
  preventGroupBy: true,
  defaultType: 'temporal_distribution'
}]
export interface TimeChartContQueryDef {
  filter: QueryFilter;
  columns: TimeChartQueryCols;
}
