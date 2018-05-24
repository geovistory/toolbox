import { Injectable } from '@angular/core';
import { DfhProperty } from 'app/core';

@Injectable()
export class ConfigService {

  constructor() { }

  // fk_class of time primitives 
  readonly timePrimitiveClass = 335;

  // Properties of ExistenceTime mapped to dfh_pk_property  
  readonly existenceTimeToFk = {
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
  readonly PROPERTY_PK_R63_NAMES = 1;

  // dfh_pk_property used to connect an appellation use with an appellation
  readonly PROPERTY_PK_R64_USED_NAME = 2;

  // dfh_pk_property used to connect an appellation use with a language
  readonly PROPERTY_PK_R61_USED_LANGUAGE = 3;



  /**
  * Dfh Properties leading to a TimePrimitiveClasses
  */
  readonly PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE = [71, 72, 150, 151, 152, 153]

  static PROPERTY_PK_TO_EXISTENCE_TIME_KEY = {
    71: 'p81',
    72: 'p82',
    150: 'p81a',
    151: 'p81b',
    152: 'p82a',
    153: 'p82b'
  } 

  /**
   * Dfh Classes
   */

  // dfh_pk_class of appellation use
  readonly CLASS_PK_APPELLATION_USE = 3;

  // dfh_pk_class of appellation
  readonly CLASS_PK_APPELLATION = 2;


  // dfh_pk_class of time primitive
  readonly CLASS_PK_TIME_PRIMITIVE = 335;

}
