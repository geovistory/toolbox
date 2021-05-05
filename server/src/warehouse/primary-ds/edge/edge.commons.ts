interface DirectedFields {
    [pkPropery: string]: Edge[];
}
export interface EntityFields {
    outgoing: DirectedFields;
    incoming: DirectedFields;
}
// This interface is to ease creation of Mock data
export interface StatementItemToIndexate {
    fk_project: number;
    ord_num_of_domain: number;
    ord_num_of_range: number;
    pk_statement: number;
    fk_property: number;
    fk_subject_info: number;
    subject_table: string;
    fk_object_info: number;
    object_table: string;
    appellation: string | null;
    language: string | null;
    lang_string: string | null;
}

export interface EdgeInitItem {
    fkProject: number;
    pkEntity: number;
    fields: EntityFields;
}

export interface Edge {

    // model information
    // fkSubject: number
    fkProperty: number;
    // fkObject: number
    isOutgoing: boolean;

    // instance level reference
    fkStatement: number;

    // instance level values
    fkSource: number;
    fkTarget: number;
    ordNumWithinField?: number;

    // true, if target is another entity (TeEn/PeIt)
    targetIsEntity: boolean;

    // if targetValue is set, the target is a value object (literal like)
    targetLabel?: string;
    targetValue?: {
        appellation?: string | null;
        dimension?: any;
        place?: any;
        timePrimitive?: EntityTimePrimitiveWithBoundaries | null;
        language?: any;
        langString?: any;
    };
}
export type CalendarType = 'gregorian' | 'julian';
export type Granularity =
    '1 century' |
    '1 decade' |
    '1 year' |
    '1 month' |
    '1 day' |
    '1 hour' |
    '1 minute' |
    '1 second';
export interface EntityTimePrimitive {
    julianDay?: number;
    duration?: Granularity;
    calendar?: CalendarType;
}
export interface EntityTimePrimitiveWithBoundaries extends EntityTimePrimitive {
    firstSecond?: number;
    lastSecond?: number;
}


export const edgeSqlTargetLabel = `'targetLabel', COALESCE( t1.appellation,  t1.language,  t1.lang_string)`

export const edgeSqlTargetValue = `'targetValue', json_strip_nulls(json_build_object(
    'appellation', t1.appellation,
    'language', t1.language,
    'langString', t1.lang_string,
    'timePrimitive', CASE WHEN t1.julian_day IS NOT NULL THEN
                        json_strip_nulls(json_build_object(
                            'julianDay', t1.julian_day,
                            'duration', t1.duration,
                            'calendar', t1.calendar,
                            'firstSecond', commons.time_primitive__get_first_second(t1.julian_day),
                            'lastSecond', commons.time_primitive__get_last_second(t1.julian_day,t1.duration,t1.calendar)
                        ))
                    ELSE
                        null
                    END
))`

export const buildOutgoingEdges = `json_build_object(
    'fkProperty', t1.fk_property,
    'isOutgoing', true,
    'fkStatement', t1.pk_statement,
    'fkSource', t1.fk_subject_info,
    'fkTarget', t1.fk_object_info,
    'ordNumWithinField', t1.ord_num_of_range,
    'targetIsEntity', t1.object_table IN ('resource'),
    ${edgeSqlTargetLabel},
    ${edgeSqlTargetValue}
)`

export const buildIncomingEdges = `json_build_object(
    'fkProperty', t1.fk_property,
    'isOutgoing', false,
    'fkStatement', t1.pk_statement,
    'fkSource', t1.fk_object_info,
    'fkTarget', t1.fk_subject_info,
    'ordNumWithinField', t1.ord_num_of_domain,
    'targetIsEntity', t1.subject_table IN ('resource'),
    ${edgeSqlTargetLabel},
    ${edgeSqlTargetValue}
)`
