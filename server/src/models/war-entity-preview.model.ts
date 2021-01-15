import {Entity, model, property} from '@loopback/repository';

/**
 * TODO-LB3-LB4
 *
 * Relations: outgoing_statements, incoming_statements, text_properties
 *
 * acls, methods, mixins
 */
export interface WarEntityPreviewId {
  pk_entity: number,
  fk_project?: number | null
}
export enum Granularity {
  '1 century' = '1 century',
  '1 decade' = '1 decade',
  '1 year' = '1 year',
  '1 month' = '1 month',
  '1 day' = '1 day',
  '1 hour' = '1 hour',
  '1 minute' = '1 minute',
  '1 second' = '1 second',
};
export enum CalendarType {
  'gregorian' = 'gregorian',
  'julian' = 'julian'
}
@model()
class TimePrimitiveWithCal {
  @property({required: true})
  julian_day: number;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(Granularity),
    },
  })
  duration: Granularity;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(CalendarType),
    },
  }) calendar: CalendarType;
}

@model()
export class TimeSpan {

  @property({type: TimePrimitiveWithCal})
  71?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  72?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  150?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  151?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  152?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  153?: TimePrimitiveWithCal;
}

export class WarEntityPreview extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'number',
  })
  project?: number;

  @property({
    type: 'number',
  })
  fk_class?: number;

  @property({
    type: 'string',
  })
  class_label?: string;

  @property({
    type: 'string',
  })
  entity_label?: string;

  @property({
    type: 'string',
  })
  entity_type?: string;

  @property({
    type: 'string',
  })
  type_label?: string;

  @property({
    type: 'number',
  })
  fk_type?: number;

  @property({
    type: TimeSpan,
  })
  time_span?: TimeSpan;

  @property({
    type: 'string',
  })
  first_second?: string;

  @property({
    type: 'string',
  })
  last_second?: string;

  @property({
    type: 'string',
  })
  tmsp_last_modification?: string;

  // Define well-known properties here

  // // Indexer property to allow additional data
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<WarEntityPreview>) {
    super(data);
  }
}
@model({
  settings: {
    forceId: false,
    id: ['pk_entity', 'fk_project'],
    postgresql: {schema: 'war', table: 'entity_preview'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarEntityPreviewWithFulltext extends WarEntityPreview {

  @property({
    type: 'string',
  })
  full_text?: string;

  @property({
    type: 'string',
  })
  ts_vector?: string;


  constructor(data?: Partial<WarEntityPreviewWithFulltext>) {
    super(data);
  }
}

export interface WarEntityPreviewRelations {
  // describe navigational properties here
}

export type WarEntityPreviewWithRelations = WarEntityPreviewWithFulltext & WarEntityPreviewRelations;
