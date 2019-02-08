import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

import { TimePrimitiveVisual } from '../models/time-primitive-visual';
import { Timeline, TimeLineData, RangeChangeEvent } from '../models/timeline';
import { XAxisDefinition } from '../models/x-axis-definition';
import { DatePipe } from '@angular/common';

@Injectable()
export class D3Service {

  /** This service will provide methods to enable user interaction with elements
  * while maintaining the d3 simulations physics
  */
  constructor(private datePipe: DatePipe) { }




  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour() { }


  /**
   * A method to bind a draggable behaviour to a xAxis element
   */
  applyDraggableXAxisBehaviour(element): Observable<{ type: 'onDrag' | 'onDragStart' | 'onDragEnd', diff?: number }> {

    return new Observable(observer => {

      const d3element = d3.select(element);

      const started = () => {
        /** Preventing propagation of dragstart to parent elements */
        d3.event.sourceEvent.stopPropagation();

        let beforeDraggedX = d3.event.x;

        observer.next({ type: 'onDragStart' })

        function dragged() {
          const diff = beforeDraggedX - d3.event.x;
          observer.next({ type: 'onDrag', diff })
          beforeDraggedX = d3.event.x;
        }

        const ended = () => {
          observer.next({ type: 'onDragEnd' })
        }

        d3.event.on('drag', dragged).on('end', ended);

      }

      d3element.call(d3.drag()
        .on('start', started));
    })

  }

  applyRangeEmitterOnKeyDown(mouseDownElement, relativeToElement): Observable<RangeChangeEvent> {
    return new Observable(observer => {

      const d3element = d3.select(mouseDownElement);

      const started = () => {
        /** Preventing propagation of dragstart to parent elements */
        d3.event.preventDefault();

        d3element.classed('active', true);
        const w = d3.select(window)
          .on('mousemove', mousemove)
          .on('mouseup', mouseup);

        observer.next({
          type: 'mousedown',
          range: d3.mouse(relativeToElement)[0]
        })

        function mousemove() {
          observer.next({
            type: 'mousemove',
            range: d3.mouse(relativeToElement)[0]
          });
        }

        function mouseup() {
          observer.next({
            type: 'mouseup',
            range: d3.mouse(relativeToElement)[0]
          })
          w.on('mousemove', null).on('mouseup', null);
        }


      }

      d3element.on('mousedown', started);
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

    d3element.attr('transform', 'translate(0,' + distanceFromTop + ')').call(axis);
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

  placeCursorOnXAxis(element, timeline: Timeline, julianSecond: number) {
    const d3element = d3.select(element);
    const x = timeline.xAxis.scale(julianSecond);
    d3element.attr('transform', 'translate(' + x + ', 0)')
  }

  private leftBracket(element, timeline: Timeline, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = timeline.options.bracketStrokeWidth;
    const halfStroke = strokeWidth / 2;

    let t = strokeWidth; //  y top
    let l = timeline.xAxis.scale(options.startDate); //  x left
    let r = timeline.xAxis.scale(options.endDate);
    let h = timeline.options.barHeight - strokeWidth; //  y bottom

    const closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path')
      .attr('transform', 'translate(0,' + timeline.options.rowPaddingTop + ')')
      .attr('d', closedPath.join(' '));

    t = halfStroke; //  y top
    l = l - halfStroke; //  x left
    r = l + timeline.options.bracketWidth;
    h = timeline.options.barHeight - halfStroke; //  y bottom

    const openPath = [];
    openPath.push('M' + r + ' ' + t); // start right top
    openPath.push('L' + l + ' ' + t); // go left
    openPath.push('L' + l + ' ' + h); // go down
    openPath.push('L' + r + ' ' + h); // go right
    d3element.selectAll('.gv-open-path')
      .attr('transform', 'translate(0,' + timeline.options.rowPaddingTop + ')')
      .attr('d', openPath.join(' '))
      .attr('stroke-width', timeline.options.bracketStrokeWidth);


  }

  private rightBracket(element, timeline: Timeline, options: TimePrimitiveVisual) {
    const d3element = d3.select(element);
    const strokeWidth = timeline.options.bracketStrokeWidth
    const halfStroke = strokeWidth / 2;

    let t = strokeWidth; //  y top
    let l = timeline.xAxis.scale(options.startDate); //  x left
    let r = timeline.xAxis.scale(options.endDate); //  x right
    let h = timeline.options.barHeight - strokeWidth; //  y bottom

    const closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-closed-path')
      .attr('transform', 'translate(0,' + timeline.options.rowPaddingTop + ')')
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
      .attr('transform', 'translate(0,' + timeline.options.rowPaddingTop + ')')
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
    const h = timeline.options.barHeight - strokeWidth; //  y bottom
    let r = timeline.xAxis.scale(options.endDate);
    let l = timeline.xAxis.scale(options.startDate); //  x left
    const diff = r - l;

    // reassure mininal width of rectangle
    if ((diff) < timeline.options.minTimeSpanWidth) {
      // go to center between l and r, then go half of minWidth to the left
      l = l + (diff / 2) - (timeline.options.minTimeSpanWidth / 2);
      // go to center between l and r, then go half of minWidth to the right
      r = r - (diff / 2) + (timeline.options.minTimeSpanWidth / 2);
    }

    const closedPath = [];
    closedPath.push('M' + l + ' ' + t); // start left top
    closedPath.push('L' + r + ' ' + t); // go right
    closedPath.push('L' + r + ' ' + h); // go down
    closedPath.push('L' + l + ' ' + h); // go left
    closedPath.push('Z') // close path
    d3element.selectAll('.gv-rectangle')
      .attr('transform', 'translate(0,' + timeline.options.rowPaddingTop + ')')
      .attr('d', closedPath.join(' '));
  }


  applyWrapText(element, text: string, width: number, padding: number) {
    const d3element = d3.select(element);

    function wrap() {
      let self = d3.select(this),
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
    return new Timeline(data, options, this.datePipe);
  }


}
