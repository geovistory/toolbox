import { Injectable } from '@angular/core';
import { DfhProperty } from 'app/core';

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

  // dfh_pk_property used to connect an appellation use with an entity
  static PROPERTY_PK_R63_NAMES = 1111;

  static PROPERTY_PK_PERSON_TO_APPE = 1192;
  static PROPERTY_PK_GROUP_TO_APPE = 1193;
  static PROPERTY_PK_GEO_PLACE_TO_APPE = 1194;
  static PROPERTY_PK_BUILT_WORK_TO_APPE = 1195;

  // dfh_pk_property used to connect an appellation use with a language
  static PROPERTY_PK_R61_USED_LANGUAGE = 1112;

  // dfh_pk_property used to connect an appellation use with an appellation
  static PROPERTY_PK_R64_USED_NAME = 1113;

  // dfh_pk_property used to connect a chunk as domain use with a persitent item or temporal entity as range 
  static PROPERTY_PK_MENTIONES = 4;



  /**
  * Dfh Properties leading to a TimePrimitiveClasses
  */
  static PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE = [71, 72, 150, 151, 152, 153]

  // dictionnary from dfh_pk_property to property name of TimePrimitive Class
  static PROPERTY_PK_TO_EXISTENCE_TIME_KEY = {
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
   * Dfh Classes
   */

  // dfh_pk_class of appellation use
  static CLASS_PK_APPELLATION_USE = 365;

  // dfh_pk_class of appellation
  static CLASS_PK_APPELLATION = 40;

  // dfh_pk_class of time primitive
  static CLASS_PK_TIME_PRIMITIVE = 335;


  // dfh_pk_class of place (not geographical place!)
  static CLASS_PK_PLACE = 51;



/**
 * System Types
 */

 static PK_SYSTEM_TYPE_TEMPORAL_ENTITY = 9;

}
