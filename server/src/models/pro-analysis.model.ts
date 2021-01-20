/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';
import {ProEntity} from '.';
import {ProProject} from './pro-project.model';
import {PubAccount} from './pub-account.model';

export enum Operator {
  'IS' = 'IS',
  'IS NOT' = 'IS NOT',
  'ENTITY_LABEL_CONTAINS' = 'ENTITY_LABEL_CONTAINS',
  'AND' = 'AND',
  'OR' = 'OR'
}
enum SubGroupType {
  "property" = "property",
  "classAndType" = "classAndType",
}
export enum ColDefDefaultType {
  'entity_preview' = 'entity_preview',
  'entity_label' = 'entity_label',
  'class_label' = 'class_label',
  'type_label' = 'type_label',
  'temporal_distribution' = 'temporal_distribution',
  'space_and_time_cont' = 'space_and_time_cont'
}
export enum QueryPathSegmentType {
  'properties' = 'properties',
  'classes' = 'classes'
};

@model()
class QueryPathSegmentData {
  // for entities table
  @property.array(Number)
  classes?: number[];
  @property.array(Number)
  types?: number[];

  // for statement table
  @property.array(Number)
  outgoingProperties?: number[];
  @property.array(Number)
  ingoingProperties?: number[];
};
@model()
export class QueryPathSegment {

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(QueryPathSegmentType),
    },
  })
  type?: QueryPathSegmentType;

  @property({type: QueryPathSegmentData})
  data: QueryPathSegmentData
}


@model({
  settings: {

  }
})
export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  @property()
  ofRootTable?: boolean;
  // if true, the groupBy for this column is prevented
  @property()
  preventGroupBy?: boolean;

  // If true, users cant edit this column
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(ColDefDefaultType),
    },
  })
  defaultType?: ColDefDefaultType

  // the label of the column in the GUI set by user
  @property()
  label?: string;

  // identifier for the column
  @property({required: true, id: true, generated: false})
  id: string;

  @property.array(QueryPathSegment)
  queryPath?: QueryPathSegment[];

}


@model()
export class QueryFilterData {
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(SubGroupType),
    },
  })
  subgroup?: SubGroupType;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Operator),
    },
  })
  operator?: Operator;

  // inherited from ClassesAndTypes:
  @property.array(Number)
  classes?: number[]

  @property.array(Number)
  types?: number[]

  // inherited from PropertySelectModel:
  @property.array(Number)
  outgoingProperties?: number[]

  @property.array(Number)
  ingoingProperties?: number[]

  // used for string search
  @property(String)
  searchTerm?: string;

}

// registerType(QueryFilterData)

@model()
export class QueryFilter {
  @property.array(QueryFilter)
  children?: QueryFilter[]

  @property({type: QueryFilterData, required: true})
  data: QueryFilterData

}
@model()
export class TimeChartContQueryDef {
  @property({type: QueryFilter, required: true})
  filter: QueryFilter;
  @property.array(ColDef, {required: true})
  columns: ColDef[];
}

@model()
export class QueryDefinition {
  @property({type: QueryFilter, required: true})
  filter: QueryFilter

  @property.array(ColDef, {required: true})
  columns: ColDef[]

  @property({type: 'number'})
  limit?: number

  @property({type: 'number'})
  offset?: number
}





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
export class AnalysisDefinition {
  // for analysis types table and map
  @property({type: QueryDefinition})
  queryDefinition?: QueryDefinition;

  // for analysis type time chart
  @property.array(TimeChartContLine)
  lines?: TimeChartContLine[]
}



@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'projects', table: 'analysis'}
  }
})
export class ProAnalysis extends Entity implements ProEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {nullable: true}
  })
  description?: string;

  @property({
    type: AnalysisDefinition,
    required: true,
  })
  analysis_definition: AnalysisDefinition;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_analysis_type: number;

  @property({
    type: 'number',
    required: false,
    jsonSchema: {nullable: true}
  })
  fk_last_modifier?: number;




  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProAnalysis>) {
    super(data);
  }
}

export interface ProAnalysisRelations {
  project?: ProProject;
  account?: PubAccount;
}

export type ProAnalysisWithRelations = ProAnalysis & ProAnalysisRelations;
