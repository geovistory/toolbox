/**
 * This file contains primary keys of data records
 * from the dfh schema, that have a special meaning
 * for the geovistory logic.
 *
 * Libraries and apps implementing logic depending on
 * such primary keys should use this config file
 * instead of putting the keys hard coded.
 */
export declare class DfhConfig {
    static timePrimitiveClass: number;
    static existenceTimeToFk: {
        'p82': number;
        'p81': number;
        'p82a': number;
        'p81a': number;
        'p81b': number;
        'p82b': number;
    };
    /**
     * Dfh Properties
     */
    static PROPERTY_PK_HAS_EXPRESSION_PORTION_TYPE: number;
    static PROPERTY_PK_IS_APPELLATION_OF: number;
    static PROPERTY_PK_GEOVP2_MENTIONS: number;
    static PROPERTY_PK_P129_IS_ABOUT: number;
    static PROPERTY_PK_GEOVP11_REFERS_TO: number;
    static PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF: number;
    static PROPERTY_PK_HAS_TIME_SPAN: number;
    static PROPERTY_PK_P18_HAS_DEFINITION: number;
    /**
    * Dfh Properties leading to a TimePrimitiveClasses
    */
    static PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE: number[];
    static PROPERTY_PK_TO_EXISTENCE_TIME_KEY: {
        [pkProperty: number]: string;
    };
    /**
     * Dfh Property leading to a Place (Geo Coordinates)
     */
    static PROPERTY_PK_WHERE_PLACE_IS_RANGE: number;
    /**
     * Dfh Classes
     */
    static CLASS_PK_APPELLATION_FOR_LANGUAGE: number;
    static CLASS_PK_APPELLATION: number;
    static CLASS_PK_LANGUAGE: number;
    static CLASS_PK_TIME_PRIMITIVE: number;
    static ClASS_PK_TIME_SPAN: number;
    static CLASS_PK_PLACE: number;
    static CLASS_PK_DIMENSION: number;
    static CLASS_PK_MEASUREMENT_UNIT: number;
    static CLASS_PK_REFERENCE: number;
    static CLASS_PK_GEOGRAPHICAL_PLACE: number;
    static CLASS_PK_BUILT_WORK: number;
    static CLASS_PK_PRESENCE: number;
    static CLASS_PK_EXPRESSION: number;
    static CLASS_PK_MANIFESTATION_PRODUCT_TYPE: number;
    static CLASS_PK_MANIFESTATION_SINGLETON: number;
    static CLASS_PK_ITEM: number;
    static CLASS_PK_WEB_REQUEST: number;
    static CLASS_PK_SPOT: number;
    static CLASS_PK_CHUNK: number;
    static CLASS_PK_EXPRESSION_PORTION: number;
    static CLASS_PKS_SOURCE_PE_IT: number[];
    static CLASS_PKS_GEO_PE_IT: number[];
    /**
     * Property of property
     */
    static P_O_P_GEOV_HAS_REFERENCE: number;
    /**
     * Profiles
     */
    static PK_PROFILE_GEOVISTORY_BASIC: number;
    /**
     * System Types
     */
    static PK_SYSTEM_TYPE_TEMPORAL_ENTITY: number;
    static PK_SYSTEM_TYPE_PERSISTENT_ITEM: number;
}
