import { TimePrimitive } from "app/core";

export class ExistenceTime {

  readonly tpKeys = ['p82', 'p81', 'p82a', 'p82b', 'p81a', 'p81b']

  p82?: TimePrimitive; // At some time within | outer bounds | not before – not after
  p81?: TimePrimitive; // Ongoing throughout | inner bounds | surely from – surely to
  p82a?: TimePrimitive; // begin of the begin | left outer bound | not before
  p81a?: TimePrimitive; // end of the begin | left inner bound | surely from
  p81b?: TimePrimitive; // begin of the end | right inner bound | surely to
  p82b?: TimePrimitive; // end of the end | right outer bound | not after

  constructor(data?) {
    Object.assign(this, data);
  }


  /**
  * get the earliest and latest TimePrimitive of this ExistenceTime
  * 
  * For earliest it compares the begin of TimePrimitive duration 
  * For latest it compares the last second of TimePrimitive duration 
  * 
  * @returns object with min Date and max Date or null, if no TimePrimitive available
  */
  getMinMaxTimePrimitive(): { min: TimePrimitive, max: TimePrimitive }|null {
    return ExistenceTime.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
  }

  /**
   * @returns array of TimePrimitives of this ExistenceTime
   */
  getArrayOfTimePrimitives():TimePrimitive[]{
    let array = [];
    
    this.tpKeys.forEach(key => {
      if(this[key]){
        array.push(this[key]);
      }
    })

    return array;
  }

  /**
  * get the earliest and latest TimePrimitive of given array of TimePrimitives
  * 
  * For earliest it compares the begin of TimePrimitive duration 
  * For latest it compares the last second of TimePrimitive duration 
  * 
  * @returns object with min Date and max Date or null, if no TimePrimitive available
  */
  static getMinMaxTimePrimitveOfArray(tps:TimePrimitive[]){

    if (!tps || tps.length < 1) return null;

    let min = tps[0];
    let max= tps[0];

    tps.forEach(tp => {        

        // if this timePrimitive is earlier than min, set this as new min
        min = tp.getDate() < min.getDate() ? tp : min;
        
        // if this timePrimitive is later than max, set this as new max
        max = tp.getEndDate() > max.getEndDate() ? tp : max;

    })

    return { min: min, max: max };
  }
}