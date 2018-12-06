import { Granularity } from 'app/core/date-time/date-time-commons';
import { CalendarType } from 'app/core/date-time/time-primitive';

export interface DataUnitPreviewList { [pk_entity: number]: DataUnitPreview };
interface TimePrimitiveWithCal {
    duration: Granularity,
    julian_day: number,
    calendar: CalendarType
}
export interface TimeSpan {
    71?: TimePrimitiveWithCal,
    72?: TimePrimitiveWithCal,
    150?: TimePrimitiveWithCal,
    151?: TimePrimitiveWithCal,
    152?: TimePrimitiveWithCal,
    153?: TimePrimitiveWithCal,
}

export class DataUnitPreview {

    pk_entity: number;
    fk_class: number;
    fk_project: number;
    entity_label: string;
    class_label: string;
    type_label?: string;
    pk_type?: number;
    entity_type: string;
    time_span?: TimeSpan;

    loading?: boolean;

    constructor(data?: DataUnitPreview) {
        Object.assign(this, data);
    }
}
