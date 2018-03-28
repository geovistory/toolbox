import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }

  /**
  * get - get property of nested object.
  *
  * Example
  *
  * user.loc = {
  *  lat: 50,
  *  long: 9
  * }
  *
  * Usage:
  * get(user, 'loc.lat')     // 50
  * get(user, 'loc.foo.bar') // undefined
  *
  * @param  {object} obj
  * @param  {string} key  point separate string
  * @return {type}     value of property or undefined
  */
  get(obj, key) {
    return key.split(".").reduce(function(o, x) {
      return (typeof o == "undefined" || o === null) ? o : o[x];
    }, obj);
  }

}
