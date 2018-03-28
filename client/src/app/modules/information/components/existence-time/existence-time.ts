import { TimePrimitive } from "app/core";

export class ExistenceTime {

  p82?: TimePrimitive; // At some time within | outer bounds | not before – not after
  p81?: TimePrimitive; // Ongoing throughout | inner bounds | surely from – surely to

  p82a?: TimePrimitive; // begin of the begin | left outer bound | not before
  p81a?: TimePrimitive; // end of the begin | left inner bound | surely from
  p81b?: TimePrimitive; // begin of the end | right inner bound | surely to
  p82b?: TimePrimitive; // end of the end | right outer bound | not after

  constructor(data?) {
    Object.assign(this, data);
  }

}