import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Point } from '../models/point';
import { Timeline } from '../models/timeline';
import { XAxisDefinition } from '../models/x-axis-definition';
import { Observable } from 'rxjs/Observable';
import { TimePrimitive, InfPersistentItem } from 'app/core';
import { ExistenceTime } from '../../information/components/existence-time';
import { $ } from 'protractor';
import { TimePrimitiveVisual } from '../models/time-primitive-visual';

@Injectable()
export class D3Service {


  /** This service will provide methods to enable user interaction with elements
  * while maintaining the d3 simulations physics
  */
  constructor() { }





  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour() { }


  /**
   * A method to bind a draggable behaviour to a xAxis element
   */
  applyDraggableXAxisBehaviour(element): Observable<any> {

    return new Observable(observer => {

      const d3element = d3.select(element);

      var started = () => {
        /** Preventing propagation of dragstart to parent elements */
        d3.event.sourceEvent.stopPropagation();

        let beforeDraggedX = d3.event.x;

        function dragged() {
          const diff = beforeDraggedX - d3.event.x;
          observer.next(diff)
          beforeDraggedX = d3.event.x;
        }

        var ended = () => {

        }

        d3.event.on("drag", dragged).on("end", ended);

      }

      d3element.call(d3.drag()
        .on("start", started));

    })

  }




  /** 
   * A method to create an x-axis out of an svg element 
   */
  applyXAxis(element, xAxis: XAxisDefinition) {
    const d3element = d3.select(element);

    const axis = d3.axisBottom(xAxis.scale).ticks(20);

    const distanceFromTop = (xAxis.containerHeight - xAxis.marginBottom);

    d3element.attr("transform", "translate(0," + distanceFromTop + ")").call(axis);
  }


  /** 
   * A method to place  an x-axis out of an svg element 
   */
  placeOnXAxis(element, options: { timePrimitive: TimePrimitive, xAxis: XAxisDefinition }) {
    const d3element = d3.select(element);

    d3element.attr("transform", "translate(" + options.xAxis.scale(options.timePrimitive.getDate()) + ", 300)")
  }



  /** 
   * A method to place the left outer symbol on x-axis
   */
  placeLeftOuterVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.leftBracket(element, xAxis, options);
  }


  /** 
 * A method to place the left inner symbol on x-axis
 */
  placeLeftInnerVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.leftBracket(element, xAxis, options);
  }

  /** 
    * A method to place the right inner symbol on x-axis
    */
  placeRightInnerVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.rightBracket(element, xAxis, options);
  }


  /** 
    * A method to place the right outer symbol on x-axis
    */
  placeRightOuterVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.rightBracket(element, xAxis, options);
  }

  /** 
  * A method to place the right outer symbol on x-axis
  */
  placeInnerVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.rectangle(element, xAxis, options);
  }

  /** 
* A method to place the right outer symbol on x-axis
*/
  placeOuterVisualOnXAxis(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    this.rectangle(element, xAxis, options);
  }

  private leftBracket(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = TimePrimitiveVisual.strokeWidth
    const halfStroke = strokeWidth / 2;

    var t = strokeWidth; //  y top
    var l = xAxis.scale(options.startDate); //  x left
    var r = xAxis.scale(options.endDate);
    var h = TimePrimitiveVisual.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path').attr('d', closedPath.join(' '));

    var t = halfStroke; //  y top
    l = l - halfStroke; //  x left
    var r = l + TimePrimitiveVisual.brackedWidth;
    var h = TimePrimitiveVisual.barHeight - halfStroke; //  y bottom

    let openPath = [];
    openPath.push('M' + r + ' ' + t); // start right top 
    openPath.push('L' + l + ' ' + t); // go left
    openPath.push('L' + l + ' ' + h); // go down
    openPath.push('L' + r + ' ' + h); // go right
    d3element.selectAll('.gv-open-path').attr('d', openPath.join(' ')).attr('stroke-width', TimePrimitiveVisual.strokeWidth);


  }

  private rightBracket(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = TimePrimitiveVisual.strokeWidth
    const halfStroke = strokeWidth / 2;

    var t = strokeWidth; //  y top
    var l = xAxis.scale(options.startDate); //  x left
    var r = xAxis.scale(options.endDate); //  x right
    var h = TimePrimitiveVisual.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path').attr('d', closedPath.join(' '));

    t = halfStroke; //  y top
    r = r + halfStroke; //  x right
    l = r - TimePrimitiveVisual.brackedWidth;
    h = TimePrimitiveVisual.barHeight - halfStroke; //  y bottom

    let openPath = [];
    openPath.push('M' + l + ' ' + t); // start left top 
    openPath.push('L' + r + ' ' + t); // go right
    openPath.push('L' + r + ' ' + h); // go down
    openPath.push('L' + l + ' ' + h); // go left
    d3element.selectAll('.gv-open-path').attr('d', openPath.join(' ')).attr('stroke-width', TimePrimitiveVisual.strokeWidth);


  }

  /**
   * Creates a rectangle on the child with class .gv-closed-path
   * @param d3element 
   * @param l left
   * @param r right
   * @param h height
   */
  private rectangle(element, xAxis: XAxisDefinition, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = TimePrimitiveVisual.strokeWidth;

    const t = strokeWidth; //  y top

    const r = xAxis.scale(options.endDate);
    const l = xAxis.scale(options.startDate); //  x left
    const h = TimePrimitiveVisual.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-rectangle').attr('d', closedPath.join(' '));
  }


  /** The interactable timeline chart
  * This method does not interact with the document, purely physical calculations with d3
  */
  getTimeline(persistentItems: InfPersistentItem[], options) {
    return new Timeline(persistentItems, options);
  }


}
