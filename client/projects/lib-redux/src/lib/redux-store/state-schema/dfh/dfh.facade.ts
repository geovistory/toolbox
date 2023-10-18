import { Injectable } from '@angular/core';
import { DfhClassFacade } from './klass/dfh-class.facade';
import { DfhLabelFacade } from './label/dfh-label.facade';
import { DfhProfileFacade } from './profile/dfh-profile.facade';
import { DfhPropertyFacade } from './property/dfh-property.facade';

@Injectable()
export class DfhFacade {
  constructor(
    public dfhClass: DfhClassFacade,
    public dfhProperty: DfhPropertyFacade,
    public dfhProfile: DfhProfileFacade,
    public dfhLabel: DfhLabelFacade,
  ) { }
}
