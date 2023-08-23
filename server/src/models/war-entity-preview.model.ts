import {Entity, model, property} from '@loopback/repository';
import {CalendarType} from './enums/CalendarType';
import {Granularity} from './enums/Granularity';

/**
 * TODO-LB3-LB4
 *
 * Relations: outgoing_statements, incoming_statements, text_properties
 *
 * acls, methods, mixins
 */
@model()
class TimePrimitiveWithCal {
  @property({required: true})
  julianDay: number;

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
export class WarEntityPreviewTimeSpan {

  @property({type: TimePrimitiveWithCal})
  p82?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81a?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p82a?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81b?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p82b?: TimePrimitiveWithCal;
}
@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'war', table: 'entity_preview'}
  }
})
export class WarEntityPreview extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  key?: string;

  @property({
    type: 'number',
    id: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    required: true
  })
  project_id?: number;

  @property({
    type: 'number',
    required: true
  })
  fk_class?: number;

  @property({
    type: 'string',
  })
  class_label?: string | null;

  @property({
    type: 'string',
  })
  entity_label?: string | null;

  @property({
    type: 'string',
  })
  entity_type?: string | null;

  @property({
    type: 'string',
  })
  type_label?: string | null;

  @property({
    type: 'number',
  })
  fk_type?: number | null;

  @property({
    type: WarEntityPreviewTimeSpan,
  })
  time_span?: WarEntityPreviewTimeSpan;

  @property({
    type: 'string',
  })
  first_second?: string | null;

  @property({
    type: 'string',
  })
  last_second?: string | null;

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

