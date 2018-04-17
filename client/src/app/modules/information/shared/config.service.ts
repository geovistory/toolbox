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

  // dfh_pk_property used to connect an appellation with an appellation use
  readonly PROPERTY_PK_R64_USED_NAME = 2;


}
