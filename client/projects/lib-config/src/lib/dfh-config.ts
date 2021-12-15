/**
 * This file contains primary keys of data records
 * from the dfh schema, that have a special meaning
 * for the geovistory logic.
 *
 * Libraries and apps implementing logic depending on
 * such primary keys should use this config file
 * instead of putting the keys hard coded.
 */
export class DfhConfig {

  // fk_class of time primitives
  static timePrimitiveClass = 335;

  // Properties of ExistenceTime mapped to dfh_pk_property
  static existenceTimeToFk = {
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

  static PROPERTY_PK_HAS_EXPRESSION_PORTION_TYPE = 1320;

  // dfh_pk_property used to connect an appellation use with an entity
  static PROPERTY_PK_IS_APPELLATION_OF = 1111;

  static PROPERY_PK_P12_USED_IN_LANGUAGE = 1112;
  // dfh_pk_property used to connect an appellation use with an appellation
  static PROPERTY_PK_P13_REFERS_TO_NAME = 1113;

  static PROPERTY_PK_P14_HAS_APPELLATION_FOR_LANGUAGE_TYPE = 1430

  // // dfh_pk_property has section
  // static PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR = 1016;

  // // dfh_pk_property is section of
  // static PROPERTY_PK_R4_CARRIERS_PROVIDED_BY = 979;

  // dfh_pk_property used to connect a a persitent item or temporal entity as domain with source, section or chunk as range
  static PROPERTY_PK_GEOVP2_MENTIONS = 1218;
  static PROPERTY_PK_P129_IS_ABOUT = 117;
  static PROPERTY_PK_GEOVP11_REFERS_TO = 1334;

  static PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF = 1216;

  static PROPERTY_PK_HAS_TIME_SPAN = 4;

  static PROPERTY_PK_P18_HAS_DEFINITION = 1762;

  static PROPERTY_PK_HAS_VALUE_VERSION = 99001; // TODO replace by pk from ontome when available
  static PROPERTY_PK_ANNOTATION_IS_PART_OF = 99004; // TODO replace by pk from ontome when available
  static PROPERTY_PK_ANNOTATION_HAS_SPOT = 99005; // TODO replace by pk from ontome when available


  // static PROPERTY_PK_AT_SOME_TIME_WITHIN = 72;
  // static PROPERTY_PK_ONGOING_THROUGHOUT = 71;
  // static PROPERTY_PK_BEGIN_OF_BEGIN = 152;
  // static PROPERTY_PK_END_OF_END = 153;
  // static PROPERTY_PK_END_OF_BEGIN = 150;
  // static PROPERTY_PK_BEGIN_OF_END = 151;

  /**
  * Dfh Properties leading to a TimePrimitiveClasses
  */
  static PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE = [71, 72, 150, 151, 152, 153]

  // dictionnary from dfh_pk_property to property name of TimePrimitive Class
  static PROPERTY_PK_TO_EXISTENCE_TIME_KEY: { [pkProperty: number]: string } = {
    71: 'p81',
    72: 'p82',
    150: 'p81a',
    151: 'p81b',
    152: 'p82a',
    153: 'p82b'
  }


  /**
   * Dfh Property leading to a Place (Geo Coordinates)
   */
  static PROPERTY_PK_WHERE_PLACE_IS_RANGE = 148

  /**
   * For Sources
   */
  static PROPERTY_PK_HAS_WEB_ADDRESS = 1760
  static PROPERTY_PK_HAS_SHORT_TITLE = 1761


  /**
   * Dfh Classes
   */

  // dfh_pk_class of appellation use
  static CLASS_PK_APPELLATION_FOR_LANGUAGE = 365;
  static CLASS_PK_APPELLATION_FOR_LANGUAGE_TYPE = 630;

  // dfh_pk_class of appellation
  static CLASS_PK_APPELLATION = 40;

  // dfh_pk_class of language
  static CLASS_PK_LANGUAGE = 54;

  // dfh_pk_class of time primitive
  static CLASS_PK_TIME_PRIMITIVE = 335;

  // dfh_pk_class of time span
  static ClASS_PK_TIME_SPAN = 50;

  // dfh_pk_class of place (not geographical place!)
  static CLASS_PK_PLACE = 51;

  // dfh_pk_class of dimension
  static CLASS_PK_DIMENSION = 52;

  // dfh_pk_class of measurement unit
  static CLASS_PK_MEASUREMENT_UNIT = 56;

  // dfh_pk_class of Reference – geovC13
  static CLASS_PK_REFERENCE = 657;

  // dfh_pk_class of geographical place (not place!)
  static CLASS_PK_GEOGRAPHICAL_PLACE = 363;

  // dfh_pk_class of built work
  static CLASS_PK_BUILT_WORK = 441;

  static CLASS_PK_PRESENCE = 84;

  static CLASS_PK_EXPRESSION = 218;


  static CLASS_PK_MANIFESTATION_PRODUCT_TYPE = 219;
  static CLASS_PK_MANIFESTATION_SINGLETON = 220;
  static CLASS_PK_ITEM = 221;
  static CLASS_PK_WEB_REQUEST = 502;
  static CLASS_PK_DEFINITION = 9901; // TODO replace by pk from ontome when available
  static CLASS_PK_ANNOTATION = 9902; // TODO replace by pk from ontome when available
  static CLASS_PK_SPOT = 457;
  static CLASS_PK_CHUNK = 456;
  static CLASS_PK_EXPRESSION_PORTION = 503;


  static CLASS_PKS_SOURCE_PE_IT = [219, 220, 221, 502];
  static CLASS_PKS_GEO_PE_IT = [363, 441];


  /**
   * Property of property
   */
  static P_O_P_GEOV_HAS_REFERENCE = 1;


  /**
   * Profiles
   */

  static PK_PROFILE_GEOVISTORY_BASIC = 5;

  /**
   * System Types
   */

  static PK_SYSTEM_TYPE_TEMPORAL_ENTITY = 9;
  static PK_SYSTEM_TYPE_PERSISTENT_ITEM = 8;

}
