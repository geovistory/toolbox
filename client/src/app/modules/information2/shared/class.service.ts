import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PropertyService } from './property.service';
import { DfhClassApi, DfhClass } from 'app/core';




@Injectable()
export class ClassService {

  constructor(
    private propertyService: PropertyService,
    private classApi: DfhClassApi
  ) { }

  /**
   * Get ingoing properties, where this class is range
   * @param {string} fkClass key of the class
   * @return {Observable}
   */
  getIngoingProperties(fkClass: number) {

    return this.propertyService.getPropertyByFkRangeClass(fkClass);

  }

  /**
   * Get the property leading to the appellation for the given class.
   * It searches properties where fkClass is range and that are inherited from property 1111
   * @param {string} fkClass key of the class
   * @return {Observable}
   */
  getIngoingAppellationProperty(fkClass: number) {

    return this.propertyService.getPropertyFromClassToAppellation(fkClass);

  }



  /**
   * Get outgoing properties, where this class is domain
   * @param {string} fkClass key of the class
   * @return {Observable}
   */
  getOutgoingProperties(fkClass: number) {

    return this.propertyService.getPropertyByFkDomainClass(fkClass);

  }


  getAll() {
    return this.classApi.find({ "include": "text_properties" });
  }


  /**
   * Get class including text_properties by primary key
   *
   * @param  {number} pkClass:number dhf_primary_key
   * @return {Observable<DfhClass>}
   */
  getByPk(pkClass: number): Observable<DfhClass> {
    return this.classApi.findById(pkClass, { "include": "text_properties" });
  }

}
