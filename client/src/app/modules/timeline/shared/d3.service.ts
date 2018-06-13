import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';

import { TimePrimitiveVisual } from '../models/time-primitive-visual';
import { Timeline, TimeLineData } from '../models/timeline';
import { XAxisDefinition } from '../models/x-axis-definition';

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

    const axis = d3.axisBottom(xAxis.scale)
      .tickSizeInner(xAxis.tickSizeInner)
      .tickSizeOuter(xAxis.tickSizeOuter)
      .tickPadding(xAxis.tickPadding);

    const distanceFromTop = xAxis.marginTop;

    d3element.attr("transform", "translate(0," + distanceFromTop + ")").call(axis);
  }


  /** 
   * A method to place the left outer symbol on x-axis
   */
  placeLeftOuterVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.leftBracket(element, timeline, options);
  }


  /** 
 * A method to place the left inner symbol on x-axis
 */
  placeLeftInnerVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.leftBracket(element, timeline, options);
  }

  /** 
    * A method to place the right inner symbol on x-axis
    */
  placeRightInnerVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.rightBracket(element, timeline, options);
  }


  /** 
    * A method to place the right outer symbol on x-axis
    */
  placeRightOuterVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.rightBracket(element, timeline, options);
  }

  /** 
  * A method to place the right outer symbol on x-axis
  */
  placeInnerVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.rectangle(element, timeline, options);
  }

  /** 
* A method to place the right outer symbol on x-axis
*/
  placeOuterVisualOnXAxis(element, timeline: Timeline, options: TimePrimitiveVisual) {
    this.rectangle(element, timeline, options);
  }

  private leftBracket(element, timeline: Timeline, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = timeline.options.bracketStrokeWidth;
    const halfStroke = strokeWidth / 2;

    var t = strokeWidth; //  y top
    var l = timeline.xAxis.scale(options.startDate); //  x left
    var r = timeline.xAxis.scale(options.endDate);
    var h = timeline.options.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path')
      .attr('transform', "translate(0," + timeline.options.rowPaddingTop + ")")
      .attr('d', closedPath.join(' '));

    var t = halfStroke; //  y top
    l = l - halfStroke; //  x left
    var r = l + timeline.options.bracketWidth;
    var h = timeline.options.barHeight - halfStroke; //  y bottom

    let openPath = [];
    openPath.push('M' + r + ' ' + t); // start right top 
    openPath.push('L' + l + ' ' + t); // go left
    openPath.push('L' + l + ' ' + h); // go down
    openPath.push('L' + r + ' ' + h); // go right
    d3element.selectAll('.gv-open-path')
      .attr('transform', "translate(0," + timeline.options.rowPaddingTop + ")")
      .attr('d', openPath.join(' '))
      .attr('stroke-width', timeline.options.bracketStrokeWidth);


  }

  private rightBracket(element, timeline: Timeline, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = timeline.options.bracketStrokeWidth
    const halfStroke = strokeWidth / 2;

    var t = strokeWidth; //  y top
    var l = timeline.xAxis.scale(options.startDate); //  x left
    var r = timeline.xAxis.scale(options.endDate); //  x right
    var h = timeline.options.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path')
      .attr('transform', "translate(0," + timeline.options.rowPaddingTop + ")")
      .attr('d', closedPath.join(' '));

    t = halfStroke; //  y top
    r = r + halfStroke; //  x right
    l = r - timeline.options.bracketWidth;
    h = timeline.options.barHeight - halfStroke; //  y bottom

    let openPath = [];
    openPath.push('M' + l + ' ' + t); // start left top 
    openPath.push('L' + r + ' ' + t); // go right
    openPath.push('L' + r + ' ' + h); // go down
    openPath.push('L' + l + ' ' + h); // go left
    d3element.selectAll('.gv-open-path')
      .attr('transform', "translate(0," + timeline.options.rowPaddingTop + ")")
      .attr('d', openPath.join(' '))
      .attr('stroke-width', timeline.options.bracketStrokeWidth);


  }

  /**
   * Creates a rectangle on the child with class .gv-closed-path
   * @param d3element 
   * @param l left
   * @param r right
   * @param h height
   */
  private rectangle(element, timeline: Timeline, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = timeline.options.bracketStrokeWidth;

    const t = strokeWidth; //  y top

    const r = timeline.xAxis.scale(options.endDate);
    const l = timeline.xAxis.scale(options.startDate); //  x left
    const h = timeline.options.barHeight - strokeWidth; //  y bottom

    let closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top 
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-rectangle')
      .attr('transform', "translate(0," + timeline.options.rowPaddingTop + ")")
      .attr('d', closedPath.join(' '));
  }


  applyWrapText(element, text:string, width: number, padding: number) {
    const d3element = d3.select(element);

    function wrap() {
      var self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
      while (textLength > (width - 2 * padding) && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + '...');
        textLength = self.node().getComputedTextLength();
      }
    }

    d3element.append('tspan').text(function (d) { return text; }).each(wrap);

  }


  /** The interactable timeline chart
  * This method does not interact with the document, purely physical calculations with d3
  */
  getTimeline(data: TimeLineData, options) {
    return new Timeline(data, options);
  }


}
