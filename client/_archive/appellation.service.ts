import { Injectable } from '@angular/core';


export const namePartTypes = [
  {
    'id': 1,
    'label': 'First Name'
  },
  {
    'id': 2,
    'label': 'Last Name'
  },
  {
    'id': 3,
    'label': 'Dynastic Number'
  },
  {
    'id': 4,
    'label': 'Other'
  }
];


@Injectable()
export class AppellationService {

  constructor() { }

  /**
   * getNamePartTypeLabelById - get the label of a name part by id.
   * Example: get 'First Name' for id 1
   *
   * @param  {number} typeId      id of the name part
   * @return {string}             label of the name part
   */
  getNamePartTypeLabelById(typeId:number){
    const labels = namePartTypes.filter(type => type.id === typeId)
    return (labels.length === 1 ? labels[0].label : '')
  }

  /**
   * getNamePartTypes - get an array with all namePartTypes.
   *
   * @return {object}               array of name part types
   */
  getNamePartTypes(){
    return namePartTypes;
  }

  /**
   * getNamePartTypeById - get namePartType object by id.
   *
   * @param  {number} typeId        id of the name part
   * @return {object}               name part object, or undefined
   */
  getNamePartTypeById(typeId:number){
    const labels = namePartTypes.filter(type => type.id === typeId)
    return (labels.length === 1 ? labels[0] : undefined)
  }
}
