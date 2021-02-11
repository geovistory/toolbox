import { TimePrimitive } from '@kleiolab/lib-utils/src/lib/date-time';
import { WarEntityPreviewTimeSpan, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
export declare const x: TimePrimitive;
export interface TimeSpanWithNumberProps {
    72?: TimePrimitiveWithCal;
    152?: TimePrimitiveWithCal;
    153?: TimePrimitiveWithCal;
    71?: TimePrimitiveWithCal;
    150?: TimePrimitiveWithCal;
    151?: TimePrimitiveWithCal;
}
export declare class TimeSpan {
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
    static fromTimeSpanDialogData(d?: TimeSpanWithNumberProps): TimeSpan;
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
