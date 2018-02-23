import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DfhProperty } from '../sdk/models/DfhProperty';
import { DfhPropertyApi } from '../sdk/services/custom/DfhProperty';

interface Label {
  sg?: string;
  pl?: string;
}



export interface DirectionAwareProperty {
  isOutgoing: boolean;
  property: DfhProperty;
  labelSg: string;
}


@Injectable()
export class PropertyService {


  /**
  * Properties
  */

  // cache of DfhProperties by Pk
  propByPkCache = {};

  // cache of api call requests for DfhProperty by Pk
  propByPkRequestCache = {};


  // cache of DfhProperties by Domain Fk
  propByDomainFkCache = {};

  // cache of api call requests for DfhProperty by Domain Fk
  propByDomainFkRequestCache = {};



  // cache of DfhProperties by Range Fk
  propByRangeFkCache = {};

  // cache of api call requests for DfhProperty by Range Fk
  propByRangeFkRequestCache = {};


  // filter object to include labels and properties on api calls
  filter: object = { "include": ["labels", "text_properties"] };

  constructor(
    private propertyApi: DfhPropertyApi
  ) { }


  /**
  * Methods
  */


  getPropertyByPkProperty(pk): Observable<{}> {

    // If property already exists in cache, return it as observable
    if (this.propByPkCache[pk])
      return Observable.of(this.propByPkCache[pk]);

    // If there is already an api call with this pk, return that observable
    // to avoid multiple api calls to the same pk
    if (this.propByPkRequestCache[pk])
      return this.propByPkRequestCache[pk];

    // Else make a api call and add the observables to a propByPkRequestCache
    this.propByPkRequestCache[pk] = this.propertyApi.findById(pk, this.filter)
      .map(property => {

        // add to cache
        this.propByPkCache[pk] = property;

        // remove the observable from cache
        delete this.propByPkRequestCache[pk];

        return property;

      });

    return this.propByPkRequestCache[pk];

  }

  getPropertyByFkDomainClass(fk) {

    // If property already exists in cache, return it as observable
    if (this.propByDomainFkCache[fk])
      return Observable.of(this.propByDomainFkCache[fk]);

    // If there is already an api call with this domain fk, return that observable
    // to avoid multiple api calls to the same domain fk
    if (this.propByDomainFkRequestCache[fk])
      return this.propByDomainFkRequestCache[fk];

    // Else make a api call and add the observables to a propByPkRequestCache
    this.propByDomainFkRequestCache[fk] = this.propertyApi
      .find({
        "where": { "dfh_has_domain": fk },
        ...this.filter
      }).map(property => {

        // add to cache
        this.propByDomainFkCache[fk] = property;

        // remove the observable from cache
        delete this.propByDomainFkRequestCache[fk];

        return property;

      });

    return this.propByDomainFkRequestCache[fk];


  }


  getPropertyByFkRangeClass(fk) {

    // If property already exists in cache, return it as observable
    if (this.propByRangeFkCache[fk])
      return Observable.of(this.propByRangeFkCache[fk]);

    // If there is already an api call with this range fk, return that observable
    // to avoid multiple api calls to the same range fk
    if (this.propByRangeFkRequestCache[fk])
      return this.propByRangeFkRequestCache[fk];

    // Else make a api call and add the observables to a propByPkRequestCache
    this.propByRangeFkRequestCache[fk] = this.propertyApi
      .find({
        "where": { "dfh_has_range": fk },
        ...this.filter
      })
      .map(property => {

        // add to cache
        this.propByRangeFkCache[fk] = property;

        // remove the observable from cache
        delete this.propByRangeFkRequestCache[fk];

        return property;

      });

    return this.propByRangeFkRequestCache[fk];


  }


  /**
  * Convert array of Property to an array of DirectionAwareProperty
  *
  * @param {boolean} isOutgoing direction: true=outgoing, false=ingoing
  * @param {DfhProperty[]} properties array of properties to Convert
  * @return {DirectionAwareProperty[]} array of DirectionAwareProperty
  */
  toDirectionAwareProperties(isOutgoing: boolean, properties: DfhProperty[]): DirectionAwareProperty[] {

    if (!properties) return [];


    return properties.map(property => {
      let labelSg: string= '';

      if (isOutgoing)
        labelSg = property.labels.find(l => l.notes === 'label.sg').dfh_label;

      else (!isOutgoing)
          labelSg = property.labels.find(l => l.notes === 'label_inversed.sg').dfh_label;

      return {
        'isOutgoing': isOutgoing,
        'property': property,
        'labelSg': labelSg
      }
    });
  }

}
