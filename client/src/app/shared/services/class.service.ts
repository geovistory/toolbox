import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { Property , PropertyService } from './property.service';




@Injectable()
export class ClassService {

  constructor(
    private propertyService:PropertyService
  ) { }

  /**
   * Get ingoing properties, where this class is range
   * @param {string} fkClass key of the class
   * @return {Property[]}
   */
  getIngoingProperties(fkClass:string):Property[]{

    return this.propertyService.getPropertyByFkRangeClass(fkClass);

  }




  /**
   * Get outgoing properties, where this class is domain
   * @param {string} fkClass key of the class
   * @return {Property[]}
   */
  getOutgoingProperties(fkClass:string):Property[]{

    return this.propertyService.getPropertyByFkDomainClass(fkClass);

  }

}
