import { Injectable } from '@angular/core';
import { DfhProperty, DfhPropertyApi } from 'app/core';
import { Observable } from 'rxjs';

import { DfhConfig } from './dfh-config';



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
  filter: object = { "include": ["labels", "text_properties", "domain_class", "range_class"] };

  constructor(
    private propertyApi: DfhPropertyApi
  ) { }


  /**
  * Methods
  */


  // getPropertyByPkProperty(pk): Observable<DfhProperty> {
  //   // If there is already an api call with this pk, return that observable
  //   // to avoid multiple api calls to the same pk
  //   if (this.propByPkRequestCache[pk])
  //     return this.propByPkRequestCache[pk];

  //   // Else create a new observable
  //   this.propByPkRequestCache[pk] = new Observable((observer) => {

  //     // If property already exists in cache, return it as observable
  //     if (this.propByPkCache[pk]) {
  //       observer.next(this.propByPkCache[pk]);
  //       observer.complete();
  //     }

  //     // Else make a api call and add the observables to a propByPkRequestCache
  //     this.propertyApi.findById(pk, this.filter)
  //       .subscribe((property: DfhProperty) => {

  //         // add to cache
  //         this.propByPkCache[pk] = property;

  //         // return data
  //         observer.next(property);

  //         // complete observer
  //         observer.complete();

  //         // remove the observable from cache
  //         delete this.propByPkRequestCache[pk];

  //       });
  //   })

  //   // Return the observable
  //   return this.propByPkRequestCache[pk];
  // }

  getPropertyByFkDomainClass(fk): Observable<DfhProperty[]> {
    // If there is already an api call with this domain fk, return that observable
    // to avoid multiple api calls to the same domain fk
    if (this.propByDomainFkRequestCache[fk])
      return this.propByDomainFkRequestCache[fk];


    // Else create and cache a new observable
    this.propByDomainFkRequestCache[fk] = new Observable((observer) => {

      // If property already exists in cache, return it as observable
      if (this.propByDomainFkCache[fk]) {
        observer.next(this.propByDomainFkCache[fk]);
        observer.complete();
      }

      // Else make a api call and add the observables to a propByPkRequestCache
      this.propertyApi
        .find({
          "where": { "dfh_has_domain": fk },
          ...this.filter
        }).subscribe((props: DfhProperty[]) => {

          const properties = props.map(prop => new DfhProperty(prop));

          // add to cache
          this.propByDomainFkCache[fk] = properties;

          // return data
          observer.next(properties);

          // complete observer
          observer.complete();

          // remove the observable from cache
          delete this.propByDomainFkRequestCache[fk];

        });


    })

    // Return the observable
    return this.propByDomainFkRequestCache[fk];

  }


  getPropertyByFkRangeClass(fk): Observable<DfhProperty[]> {

    // If there is already an api call with this range fk, return that observable
    // to avoid multiple api calls to the same range fk
    if (this.propByRangeFkRequestCache[fk])
      return this.propByRangeFkRequestCache[fk];


    // Else create and cache a new observable
    this.propByRangeFkRequestCache[fk] = new Observable((observer) => {

      // If property already exists in cache, return it as observable
      if (this.propByRangeFkCache[fk]) {
        observer.next(this.propByRangeFkCache[fk]);
        observer.complete();
      }

      // Else make a api call
      this.propertyApi
        .find({
          "where": { "dfh_has_range": fk },
          ...this.filter
        }).subscribe((props: DfhProperty[]) => {

          const properties = props.map(prop => new DfhProperty(prop));

          // add to cache
          this.propByRangeFkCache[fk] = properties;

          // return data
          observer.next(properties);

          // complete observer
          observer.complete();

          // remove the observable from cache
          delete this.propByRangeFkRequestCache[fk];

        });

    });

    // Return the observable
    return this.propByRangeFkRequestCache[fk];

  }



  /**
   * searches for properties that have the given pk as range
   * and a dfh_fk_property_of_origin == 1111
   * @param pk 
   */
  getPropertyFromClassToAppellation(pk): Observable<DfhProperty> {

    return new Observable((observer) => {

      // Else make a api call and add the observables to a propByPkRequestCache
      this.propertyApi.find({
        "where": { "dfh_has_range": pk, "dfh_fk_property_of_origin": DfhConfig.PROPERTY_PK_R63_NAMES },
        ...this.filter
      }).subscribe((properties: DfhProperty[]) => {

        const property = properties[0];

        // return data
        observer.next(property);

        // complete observer
        observer.complete();

      });
    })

  }


  /**
   * quantityIsValid - Verify if the quantity of roles is valid according to the
   * min and max quantifiers given by the property. If isOutgoing is true
   * the quantityOfRoles is validated against the range quantifiers, else against
   * the domain quantifiers.
   *
   *
   * @param  {number} quantityOfRoles:number  quantity of roles of given property
   * @param  {DfhProperty} property:DfhProperty  property with quantifiers
   * @param  {boolean} isOutgoing:boolean  if true, range is relevant, else domain
   * @return {boolean}                     true if valid
   */
  validateQuantity(quantityOfRoles: number, property: DfhProperty, isOutgoing: boolean): boolean {
    let max, min;

    if (isOutgoing) {
      max = property.dfh_range_instances_max_quantifier;
      min = property.dfh_range_instances_min_quantifier;
    }
    else {
      max = property.dfh_domain_instances_max_quantifier;
      min = property.dfh_domain_instances_min_quantifier;
    }

    max = (max === -1 ? Number.POSITIVE_INFINITY : max);
    min = (min === -1 ? Number.POSITIVE_INFINITY : min);

    return (
      quantityOfRoles >= min &&
      quantityOfRoles <= max
    )

  }

}