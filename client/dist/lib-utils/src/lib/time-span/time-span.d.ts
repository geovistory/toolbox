import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
import { CalendarType, TimePrimitive } from '@kleiolab/lib-utils/src/lib/date-time';
export declare const x: TimePrimitive;
export interface InfTimePrimitiveWithCalendar extends InfTimePrimitive {
    calendar: CalendarType;
}
export interface TimeSpanWithNumberProps {
    72?: InfTimePrimitiveWithCalendar;
    152?: InfTimePrimitiveWithCalendar;
    153?: InfTimePrimitiveWithCalendar;
    71?: InfTimePrimitiveWithCalendar;
    150?: InfTimePrimitiveWithCalendar;
    151?: InfTimePrimitiveWithCalendar;
}
export declare class TimeSpanUtil {
    readonly tpKeys: string[];
    p82?: TimePrimitive;
    p81?: TimePrimitive;
    p82a?: TimePrimitive;
    p81a?: TimePrimitive;
    p81b?: TimePrimitive;
    p82b?: TimePrimitive;
    readonly earliestDay: number;
    /**
    * get the earliest and latest TimePrimitive of given array of TimePrimitives
    *
    * For earliest it compares the begin of TimePrimitive duration
    * For latest it compares the last second of TimePrimitive duration
    *
    * @returns object with min Date and max Date or null, if no TimePrimitive available
    */
    static getMinMaxTimePrimitveOfArray(tps: TimePrimitive[]): {
        min: TimePrimitive;
        max: TimePrimitive;
    };
    static fromTimeSpanDialogData(d?: TimeSpanWithNumberProps): TimeSpanUtil;
    constructor(data?: WarEntityPreviewTimeSpan);
    /**
     * returns true if no TimePrimitive is there
     */
    isEmpty(): boolean;
    /**
     * returns true if at least one TimePrimitive is there
     */
    isNotEmpty(): boolean;
    /**
    * get the earliest and latest TimePrimitive of this TimeSpan
    *
    * For earliest it compares the begin of TimePrimitive duration
    * For latest it compares the last second of TimePrimitive duration
    *
    * @returns object with min Date and max Date or null, if no TimePrimitive available
    */
    getMinMaxTimePrimitive(): {
        min: TimePrimitive;
        max: TimePrimitive;
    } | null;
    /**
     * @returns array of TimePrimitives of this TimeSpan
     */
    getArrayOfTimePrimitives(): TimePrimitive[];
    getPrimitivesForPreview(): {
        single?: TimePrimitive;
        begin?: TimePrimitive;
        end?: TimePrimitive;
    };
}
