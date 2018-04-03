import { D3Service } from "../shared/d3.service";
import { ElementRef, Input } from "@angular/core";
import { XAxisDefinition } from "./x-axis-definition";
import { TimePrimitive } from "app/core";

export class TimePrimitiveVisual {

  static readonly barHeight = 14; // pixels
  static readonly brackedWidth = 4; // width of the enclosing brackets at the lefter or righter end of a bar in pixels
  static readonly strokeWidth = 2; // pixels


  startDate: Date;
  endDate: Date;

  constructor(protected d3Service: D3Service, protected _element: ElementRef) {

  }

  initTimePrimitiveVisual(leftOuterOnXAxis) {
    const timePrimitive = leftOuterOnXAxis.timePrimitive;
    this.startDate = timePrimitive.getDate();
    const dateTime = timePrimitive.getDateTime();
    const endOfDuration = dateTime.getEndOf(timePrimitive.duration);
    this.endDate = endOfDuration.getDate();
  }

  
}