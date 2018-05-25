import { D3Service } from "../shared/d3.service";
import { ElementRef, Input } from "@angular/core";
import { XAxisDefinition } from "./x-axis-definition";
import { TimePrimitive } from "app/core";

export class TimePrimitiveVisual {

  startDate: number;
  endDate: number;

  constructor(protected d3Service: D3Service, protected _element: ElementRef) {

  }

  initTimePrimitiveVisual(leftOuterOnXAxis) {
    const timePrimitive:TimePrimitive = leftOuterOnXAxis.timePrimitive;
    this.startDate = timePrimitive.getJulianSecond();
    const dateTime = timePrimitive.getDateTime();
    const endOfDuration = dateTime.getEndOf(timePrimitive.duration);
    this.endDate = endOfDuration.getJulianSecond();
  }
 
}