/**
 * @fileoverview added by tsickle
 * Generated from: lib/dfh-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DfhConfig = /** @class */ (function () {
    function DfhConfig() {
    }
    // fk_class of time primitives
    DfhConfig.timePrimitiveClass = 335;
    // Properties of ExistenceTime mapped to dfh_pk_property
    DfhConfig.existenceTimeToFk = {
        'p82': 72,
        'p81': 71,
        'p82a': 152,
        'p81a': 150,
        'p81b': 151,
        'p82b': 153
    };
    /**
     * Dfh Properties
     */
    DfhConfig.PROPERTY_PK_HAS_EXPRESSION_PORTION_TYPE = 1320;
    // dfh_pk_property used to connect an appellation use with an entity
    DfhConfig.PROPERTY_PK_IS_APPELLATION_OF = 1111;
    // // dfh_pk_property used to connect an appellation use with an appellation
    // static PROPERTY_PK_R64_USED_NAME = 1113;
    // // dfh_pk_property has section
    // static PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR = 1016;
    // // dfh_pk_property is section of
    // static PROPERTY_PK_R4_CARRIERS_PROVIDED_BY = 979;
    // dfh_pk_property used to connect a a persitent item or temporal entity as domain with source, section or chunk as range
    DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS = 1218;
    DfhConfig.PROPERTY_PK_P129_IS_ABOUT = 117;
    DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO = 1334;
    DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF = 1216;
    DfhConfig.PROPERTY_PK_HAS_TIME_SPAN = 4;
    DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION = 1762;
    // static PROPERTY_PK_AT_SOME_TIME_WITHIN = 72;
    // static PROPERTY_PK_ONGOING_THROUGHOUT = 71;
    // static PROPERTY_PK_BEGIN_OF_BEGIN = 152;
    // static PROPERTY_PK_END_OF_END = 153;
    // static PROPERTY_PK_END_OF_BEGIN = 150;
    // static PROPERTY_PK_BEGIN_OF_END = 151;
    /**
     * Dfh Properties leading to a TimePrimitiveClasses
     */
    DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE = [71, 72, 150, 151, 152, 153];
    // dictionnary from dfh_pk_property to property name of TimePrimitive Class
    DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY = {
        71: 'p81',
        72: 'p82',
        150: 'p81a',
        151: 'p81b',
        152: 'p82a',
        153: 'p82b'
    };
    /**
     * Dfh Property leading to a Place (Geo Coordinates)
     */
    DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE = 148;
    /**
     * Dfh Classes
     */
    // dfh_pk_class of appellation use
    DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE = 365;
    // dfh_pk_class of appellation
    DfhConfig.CLASS_PK_APPELLATION = 40;
    // dfh_pk_class of language
    DfhConfig.CLASS_PK_LANGUAGE = 54;
    // dfh_pk_class of time primitive
    DfhConfig.CLASS_PK_TIME_PRIMITIVE = 335;
    // dfh_pk_class of time span
    DfhConfig.ClASS_PK_TIME_SPAN = 50;
    // dfh_pk_class of place (not geographical place!)
    DfhConfig.CLASS_PK_PLACE = 51;
    // dfh_pk_class of dimension
    DfhConfig.CLASS_PK_DIMENSION = 52;
    // dfh_pk_class of measurement unit
    DfhConfig.CLASS_PK_MEASUREMENT_UNIT = 56;
    // dfh_pk_class of Reference – geovC13
    DfhConfig.CLASS_PK_REFERENCE = 657;
    // dfh_pk_class of geographical place (not place!)
    DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE = 363;
    // dfh_pk_class of built work
    DfhConfig.CLASS_PK_BUILT_WORK = 441;
    DfhConfig.CLASS_PK_PRESENCE = 84;
    DfhConfig.CLASS_PK_EXPRESSION = 218;
    DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE = 219;
    DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON = 220;
    DfhConfig.CLASS_PK_ITEM = 221;
    DfhConfig.CLASS_PK_WEB_REQUEST = 502;
    DfhConfig.CLASS_PK_SPOT = 457;
    DfhConfig.CLASS_PK_CHUNK = 456;
    DfhConfig.CLASS_PK_EXPRESSION_PORTION = 503;
    DfhConfig.CLASS_PKS_SOURCE_PE_IT = [219, 220, 221, 502];
    DfhConfig.CLASS_PKS_GEO_PE_IT = [363, 441];
    /**
     * Property of property
     */
    DfhConfig.P_O_P_GEOV_HAS_REFERENCE = 1;
    /**
     * Profiles
     */
    DfhConfig.PK_PROFILE_GEOVISTORY_BASIC = 5;
    /**
     * System Types
     */
    DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY = 9;
    DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM = 8;
    return DfhConfig;
}());
if (false) {
    /** @type {?} */
    DfhConfig.timePrimitiveClass;
    /** @type {?} */
    DfhConfig.existenceTimeToFk;
    /**
     * Dfh Properties
     * @type {?}
     */
    DfhConfig.PROPERTY_PK_HAS_EXPRESSION_PORTION_TYPE;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_IS_APPELLATION_OF;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_P129_IS_ABOUT;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_HAS_TIME_SPAN;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION;
    /**
     * Dfh Properties leading to a TimePrimitiveClasses
     * @type {?}
     */
    DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE;
    /** @type {?} */
    DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY;
    /**
     * Dfh Property leading to a Place (Geo Coordinates)
     * @type {?}
     */
    DfhConfig.PROPERTY_PK_WHERE_PLACE_IS_RANGE;
    /**
     * Dfh Classes
     * @type {?}
     */
    DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE;
    /** @type {?} */
    DfhConfig.CLASS_PK_APPELLATION;
    /** @type {?} */
    DfhConfig.CLASS_PK_LANGUAGE;
    /** @type {?} */
    DfhConfig.CLASS_PK_TIME_PRIMITIVE;
    /** @type {?} */
    DfhConfig.ClASS_PK_TIME_SPAN;
    /** @type {?} */
    DfhConfig.CLASS_PK_PLACE;
    /** @type {?} */
    DfhConfig.CLASS_PK_DIMENSION;
    /** @type {?} */
    DfhConfig.CLASS_PK_MEASUREMENT_UNIT;
    /** @type {?} */
    DfhConfig.CLASS_PK_REFERENCE;
    /** @type {?} */
    DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE;
    /** @type {?} */
    DfhConfig.CLASS_PK_BUILT_WORK;
    /** @type {?} */
    DfhConfig.CLASS_PK_PRESENCE;
    /** @type {?} */
    DfhConfig.CLASS_PK_EXPRESSION;
    /** @type {?} */
    DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE;
    /** @type {?} */
    DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON;
    /** @type {?} */
    DfhConfig.CLASS_PK_ITEM;
    /** @type {?} */
    DfhConfig.CLASS_PK_WEB_REQUEST;
    /** @type {?} */
    DfhConfig.CLASS_PK_SPOT;
    /** @type {?} */
    DfhConfig.CLASS_PK_CHUNK;
    /** @type {?} */
    DfhConfig.CLASS_PK_EXPRESSION_PORTION;
    /** @type {?} */
    DfhConfig.CLASS_PKS_SOURCE_PE_IT;
    /** @type {?} */
    DfhConfig.CLASS_PKS_GEO_PE_IT;
    /**
     * Property of property
     * @type {?}
     */
    DfhConfig.P_O_P_GEOV_HAS_REFERENCE;
    /**
     * Profiles
     * @type {?}
     */
    DfhConfig.PK_PROFILE_GEOVISTORY_BASIC;
    /**
     * System Types
     * @type {?}
     */
    DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY;
    /** @type {?} */
    DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DfhConfig };
//# sourceMappingURL=kleiolab-lib-config.js.map
