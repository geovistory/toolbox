import { Injectable } from '@angular/core';
import { DfhClassFacade } from './klass/dfh-class.facade';

@Injectable()
export class SysFacade {
  constructor(
    public config: DfhClassFacade,
    public dfhtemRelevantClass: DfhClassFacade,
  ) { }
}
