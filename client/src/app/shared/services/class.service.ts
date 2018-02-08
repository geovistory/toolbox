import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Property, PropertyService } from './property.service';


export interface Class {
  label: string;
  pk_class: string;
  scope_note: string;
  dataForHistoryId: number;
}

// TODO: replace this fake data with search result from database
const classes: Class[] = [
  {
    'label': 'Person',
    'pk_class': 'E21',
    'scope_note': 'This class comprises real persons who live or are assumed to have lived.',
    'dataForHistoryId': 21
  },
  {
    'label': '[Place]',
    'pk_class': 'E53',
    'scope_note': 'Places are usually determined by reference to the position of “immobile” objects such as buildings, cities, mountains, rivers, or dedicated geodetic marks.',
    'dataForHistoryId': 53
  },
  {
    'label': '[Group]',
    'pk_class': 'E74',
    'scope_note': 'This class comprises any gatherings or organizations of Actors that act collectively or in a similar way due to any form of unifying relationship.',
    'dataForHistoryId': 74
  }
]

@Injectable()
export class ClassService {

  constructor(
    private propertyService: PropertyService
  ) { }

  /**
   * Get ingoing properties, where this class is range
   * @param {string} fkClass key of the class
   * @return {Property[]}
   */
  getIngoingProperties(fkClass: string): Property[] {

    return this.propertyService.getPropertyByFkRangeClass(fkClass);

  }




  /**
   * Get outgoing properties, where this class is domain
   * @param {string} fkClass key of the class
   * @return {Property[]}
   */
  getOutgoingProperties(fkClass: string): Property[] {

    return this.propertyService.getPropertyByFkDomainClass(fkClass);

  }


  getAll(): Class[] {
    return classes;
  }

}
