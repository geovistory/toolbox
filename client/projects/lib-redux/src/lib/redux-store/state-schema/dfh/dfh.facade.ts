import { Injectable } from '@angular/core';
import { DfhClassFacade } from './klass/dfh-class.facade';
import { DfhPropertyFacade } from './property/dfh-property.facade';

@Injectable()
export class DfhFacade {
  constructor(
    public dfhClass: DfhClassFacade,
    public dfhProperty: DfhPropertyFacade,
  ) { }
}
