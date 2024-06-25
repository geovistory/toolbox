import { Injectable } from '@angular/core';
import { DfhClassFacade } from './klass/dfh-class.facade';
import { DfhLabelFacade } from './label/dfh-label.facade';
import { DfhProfileFacade } from './profile/dfh-profile.facade';
import { DfhPropertyFacade } from './property/dfh-property.facade';

@Injectable({
  providedIn: 'root'
})
export class DfhFacade {
  constructor(
    public klass: DfhClassFacade,
    public property: DfhPropertyFacade,
    public profile: DfhProfileFacade,
    public label: DfhLabelFacade,
  ) { }
}
