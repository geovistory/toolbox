import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

interface Label {
  sg?: string;
  pl?: string;
}

/**
* TODO remove this interface as soon as it is available in SDK
*/
export interface Property{
  pk_property:string;
  fk_domain_class:string;
  fk_range_class:string;
  type?:string;
  label:Label;
  label_inversed?:Label;
  domainCardinalityMin:number;
  domainCardinalityMax:number;
  rangeCardinalityMin:number;
  rangeCardinalityMax:number;
}

const properties:Property[]= [
  {
    pk_property:'P152',
    fk_domain_class: 'E21',
    fk_range_class: 'E21',
    label:{
      'sg': 'has parent',
      'pl': 'has parents'
    },
    label_inversed: {
      'sg': 'has child',
      'pl': 'has children'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: 2,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'P98',
    fk_domain_class: 'E67',
    fk_range_class: 'E21',
    label: {
      'sg': 'Born person',
      'pl': 'Born persons'
    },
    label_inversed: {
      'sg': 'Birth of this person',
      'pl': 'Births of this person'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: Number.POSITIVE_INFINITY,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'P96',
    fk_domain_class: 'E67',
    fk_range_class: 'E21',
    label: {
      'sg': 'Mother giving birth',
      'pl': 'Mothers giving birth'
    },
    label_inversed: {
      'sg': 'Birth this mother gave',
      'pl': 'Births this mother gave'
    },
    domainCardinalityMax: Number.POSITIVE_INFINITY,
    domainCardinalityMin: 1,
    rangeCardinalityMax: 1,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'P100',
    fk_domain_class: 'E69',
    fk_range_class: 'E21',
    label: {
      'sg': 'Person that died',
      'pl': 'Persons that died'
    },
    label_inversed: {
      'sg': 'Death',
      'pl': 'Deaths'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: 1,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'R63',
    fk_domain_class: 'E21',
    fk_range_class: 'F52',
    label:{
      'sg': 'Name',
      'pl': 'Names'
    },
    label_inversed: {
      'sg': 'Is name of',
      'pl': 'Is name of'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: Number.POSITIVE_INFINITY,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'R64',
    fk_domain_class: 'F52',
    fk_range_class: 'E82',
    label:{
      'sg': 'Name',
      'pl': 'Names'
    },
    label_inversed: {
      'sg': 'Is name of',
      'pl': 'Is name of'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: 1,
    rangeCardinalityMin: 1
  },
  {
    pk_property:'R61',
    fk_domain_class: 'F52',
    fk_range_class: 'E56',
    label:{
      'sg': 'Language of name',
      'pl': 'Languages of name'
    },
    label_inversed: {
      'sg': 'Language of name',
      'pl': 'Languages of name'
    },
    domainCardinalityMax: 1,
    domainCardinalityMin: 1,
    rangeCardinalityMax: 1,
    rangeCardinalityMin: 1
  }
]

export interface DirectionAwareProperty {
  isOutgoing:boolean;
  property:Property;
}


@Injectable()
export class PropertyService {

  constructor() { }


  /**
  * Methods
  */


  getPropertyByPkProperty(pk):Property{

    return properties.filter(p => p.pk_property === pk)[0];
  }

  getPropertyByFkDomainClass(fk):Property[]{

    return properties.filter(p => p.fk_domain_class === fk);
  }


  getPropertyByFkRangeClass(fk):Property[]{

    return properties.filter(p => p.fk_range_class === fk);
  }


  /**
   * Convert array of Property to an array of DirectionAwareProperty
   *
   * @param {boolean} isOutgoing direction: true=outgoing, false=ingoing
   * @param {Property[]} properties array of properties to Convert
   * @return {DirectionAwareProperty[]} array of DirectionAwareProperty
   */
  toDirectionAwareProperties(isOutgoing:boolean, properties:Property[]):DirectionAwareProperty[]{
    return properties.map(property => {
      return {
        'isOutgoing': isOutgoing,
        'property': property
      }
    });
  }

}
