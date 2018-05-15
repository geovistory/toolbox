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
   * Dfh Classes
   */

  // dfh_pk_class of appellation use
  readonly CLASS_PK_APPELLATION_USE = 3;

  // dfh_pk_class of appellation
  readonly CLASS_PK_APPELLATION = 2;
}
