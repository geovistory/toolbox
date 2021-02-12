(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-config', ['exports'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-config'] = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/dfh-config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This file contains primary keys of data records
     * from the dfh schema, that have a special meaning
     * for the geovistory logic.
     *
     * Libraries and apps implementing logic depending on
     * such primary keys should use this config file
     * instead of putting the keys hard coded.
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
     * Generated from: lib/sys-config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Contains configuration of keys used in the the system-schema
     * that are relevant for the app logic.
     *
     * Example: the ui-context keys are used to query the order of properties in different contexts
     */
    var SysConfig = /** @class */ (function () {
        function SysConfig() {
        }
        /**
         * ********************
         * Ui Contexts
         * **********************
         */
        // Toolbox-wide context
        SysConfig.PK_UI_CONTEXT_ADD = 47;
        // Entities context
        SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE = 45;
        SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE = 46;
        // Sources context
        SysConfig.PK_UI_CONTEXT_SOURCES_EDITABLE = 210;
        SysConfig.PK_UI_CONTEXT_SOURCES_CREATE = 211;
        // Data Settings > Types context
        SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE = 212;
        SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE = 213;
        /**
         * ********************
         * Class Fields
         * **********************
         */
        SysConfig.PK_CLASS_FIELD_WHEN = 48;
        SysConfig.PK_CLASS_FIELD_SHORT_TITLE = 217;
        SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE = 218;
        SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION = 219;
        SysConfig.PK_CLASS_FIELD_COMMENT = 3364;
        /**
         * ********************
         * System Types
         * **********************
         */
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DEFINITION = 179;
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL = 639;
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION = 638;
        SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS = 184;
        SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DATA = 3295;
        SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT = 3292;
        SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC = 3293;
        SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT = 3286;
        SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE = 3287;
        /**
         * ********************
         * Analysis Types
         * **********************
         */
        SysConfig.PK_ANALYSIS_TYPE__TIME_CONT = 3331;
        SysConfig.PK_ANALYSIS_TYPE__TABLE = 3332;
        SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT = 3333;
        return SysConfig;
    }());
    if (false) {
        /**
         * ********************
         * Ui Contexts
         * **********************
         * @type {?}
         */
        SysConfig.PK_UI_CONTEXT_ADD;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_SOURCES_EDITABLE;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_SOURCES_CREATE;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE;
        /** @type {?} */
        SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE;
        /**
         * ********************
         * Class Fields
         * **********************
         * @type {?}
         */
        SysConfig.PK_CLASS_FIELD_WHEN;
        /** @type {?} */
        SysConfig.PK_CLASS_FIELD_SHORT_TITLE;
        /** @type {?} */
        SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE;
        /** @type {?} */
        SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION;
        /** @type {?} */
        SysConfig.PK_CLASS_FIELD_COMMENT;
        /**
         * ********************
         * System Types
         * **********************
         * @type {?}
         */
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DEFINITION;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DATA;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT;
        /** @type {?} */
        SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE;
        /**
         * ********************
         * Analysis Types
         * **********************
         * @type {?}
         */
        SysConfig.PK_ANALYSIS_TYPE__TIME_CONT;
        /** @type {?} */
        SysConfig.PK_ANALYSIS_TYPE__TABLE;
        /** @type {?} */
        SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT;
    }

    exports.DfhConfig = DfhConfig;
    exports.SysConfig = SysConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-config.umd.js.map
