import { Granularity } from 'app/core/date-time/date-time-commons';
import { CalendarType } from 'app/core/date-time/time-primitive';

export type EntityType = 'peIt' | 'teEn';
export interface EntityPreviewList { [pk_entity: number]: EntityPreview };
interface TimePrimitiveWithCal {
  duration: Granularity,
  julian_day: number,
  calendar: CalendarType
}
export interface TimeSpan {
  71?: TimePrimitiveWithCal,
  72?: TimePrimitiveWithCal,
  150?: TimePrimitiveWithCal,
  151?: TimePrimitiveWithCal,
  152?: TimePrimitiveWithCal,
  153?: TimePrimitiveWithCal,
}

export class EntityPreview {

  pk_entity: number;
  fk_class?: number;
  fk_project: number;
  entity_label: string;
  class_label: string;
  type_label?: string;
  fk_type?: number;
  entity_type: EntityType;
  time_span?: TimeSpan;
  first_second?: number;
  last_second?: number;

  loading?: boolean;

  constructor(data?: EntityPreview) {
    Object.assign(this, data);
  }
}
