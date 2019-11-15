import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { U } from 'app/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { ChartLinePoint } from '../../../../../../src/common/interfaces';
import { ChartLineDefinition } from '../components/chart-line-visual/chart-line-visual.component';
import { TimePrimitiveVisual } from '../models/time-primitive-visual';
import { RangeChangeEvent, Timeline, TimeLineData } from '../models/timeline';
import { XAxisDefinition } from '../models/x-axis-definition';
import { YAxisDefinition } from '../models/y-axis-definition';



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

  applyRangeEmitterOnKeyDown(mouseDownElement: HTMLElement, relativeToElement: HTMLElement): Observable<RangeChangeEvent> {
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
 * A method to create an x-axis out of an svg element
 */
  applyYAxis(element, yAxis: YAxisDefinition) {
    const d3element = d3.select(element);

    const axis = d3.axisLeft(yAxis.scale)
      .tickSizeInner(yAxis.config.tickSizeInner)
      .tickSizeOuter(yAxis.config.tickSizeOuter)
      .tickPadding(yAxis.config.tickPadding);

    d3element.attr('transform', `translate(${yAxis.config.marginLeft},0)`).call(axis);
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
      .attr('d', closedPath.join(' '))
      .attr('fill', options.color);

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
      .attr('d', closedPath.join(' '))
      .attr('fill', options.color);

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
      .attr('d', closedPath.join(' '))
      .attr('fill', options.color);
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

  placeChartLineVisual(element: Element, def: ChartLineDefinition) {
    const config = def.config;
    const scaleX = config.scaleX;
    const scaleY = config.scaleY;
    const chartData = config.data;
    const activeLine = chartData.activeLine === null || chartData.activeLine == undefined ?
      null :
      chartData.chartLines[chartData.activeLine];
    const lineGenerator = d3.line<ChartLinePoint>()
      .defined(d => !isNaN(d.y))
      .x(d => scaleX(d.x))
      .y(d => scaleY(d.y));

    const clipPathId = U.uuid()

    const d3element = d3.select(element);

    // Clip path prevents the line from being displayed outside its area
    d3element.selectAll('.defs').remove();
    const defs = d3element
      .attr('clip-path', `url(#${clipPathId})`)
      .append('svg')
      .attr('class', 'defs')
      .attr('width', 0)
      .attr('height', 0)
      .append('defs');

    defs.append('clipPath')
      .attr('id', clipPathId)
      .append('rect')
      .attr('x', config.marginLeft)
      .attr('y', config.marginTop)
      .attr('width', config.width)
      .attr('height', config.height);

    // create a container for other things
    d3element.selectAll('.line-chart-container').remove();
    const containerSvg = d3element.append('svg')
      .attr('class', 'line-chart-container');
    const containerG = containerSvg
      .append('g')

    // creates background for capturing mouse events
    const bg = containerG
      .append('rect')
      .style('opacity', 0)
      .attr('class', 'background-rect')
      .attr('x', config.marginLeft)
      .attr('y', config.marginTop)
      .attr('width', config.width)
      .attr('height', config.height);


    // Creates the passive lines
    // if (!activeLine) {
    for (let i = 0; i < chartData.chartLines.length; i++) {
      const isPassive = i !== chartData.activeLine;
      if (isPassive) {

        const chartLine = chartData.chartLines[i];

        const passivePath = containerG.append('path')
          .datum(chartLine.linePoints)
          .attr('fill', 'none')
          .attr('opacity', activeLine ? 0.1 : 0.5)
          .attr('stroke', 'gray')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', lineGenerator);

        const passivePathBg = containerG.append('path')
          .datum(chartLine.linePoints)
          .attr('fill', 'none')
          .attr('stroke-width', 10)
          .attr('stroke', 'blue')
          .attr('opacity', 0)
          .attr('d', lineGenerator);

        if (!activeLine) {
          passivePathBg.on('click', function () {
            const [mouseX] = d3.mouse(this);

            def.activateLine(i, mouseX);
          })

          passivePathBg.on('mouseover', function () {
            passivePath
              .attr('stroke-width', 2)
              .attr('opacity', 1)
          })
          passivePathBg.on('mouseleave', function () {
            passivePath
              .attr('stroke-width', 1.5)
              .attr('opacity', 0.5)
          })
        }
      }
    }
    // }

    // create the active line
    if (activeLine) {
      const activePath = containerG.append('path')
        .datum(activeLine.linePoints)
        .attr('fill', 'none')
        .attr('opacity', 1)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator);

      activePath.on('click', function () {
        def.deactivateLine();
      })
    }


    // Create mouseover stuff

    // Create function that retrieves the data point from chartData for given range value on x axis
    const bi = d3.bisector<ChartLinePoint, any>(d => d.x).left;
    const bisect = (xDomain: number, linePoints: ChartLinePoint[]) => {
      const index = bi(linePoints, xDomain);
      const a: ChartLinePoint = linePoints[index - 1];
      const b: ChartLinePoint = linePoints[index];
      if (!b) return a;
      if (!a) return b;
      return xDomain - a.y > b.y - xDomain ? b : a;
    };

    let inspectedLinePoint: ChartLinePoint;


    // creates vertical line that appears on mouse move or touch
    // container.selectAll('line').remove();
    const verticalLine = containerG
      .append('line')
      .style('stroke-width', 0)
      .style('stroke', 'gray')
      .style('pointer-events', 'none')
      .attr('x1', 0)
      .attr('y1', config.marginTop)
      .attr('x2', 0)
      .attr('y2', config.height);
    const circleRadius = 12;
    const circleG = containerG
      .append('g')
      .attr('class', 'circle-group')
      .style('visibility', 'hidden');
    const circleBg = circleG
      .append('circle')
      .style('stroke-width', 0)
      .style('fill', '#64ffda')
      .style('opacity', 1)
      .style('cursor', 'pointer')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', circleRadius);
    const circleStroke = circleG
      .append('circle')
      .style('stroke-width', 1)
      .attr('class', 'mat-stroke-accent')
      .style('fill', 'none')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', circleRadius);
    const circleText = circleG
      .append('text')
      .style('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('class', 'mat-caption')

    const xAxisHoverLabel = containerG
      .append('text')
      .attr('transform', `translate(${config.width},${config.marginTop + 10})`)
      .style('pointer-events', 'none')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'central')
      .attr('class', 'mat-caption')
      .text('')

    const activeLineLabel = containerG
      .append('text')
      .attr('transform', `translate(${config.marginLeft + 10},${config.marginTop + 10})`)
      .style('pointer-events', 'none')
      .style('font-size', '14px')
      .attr('fill', 'steelblue')
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'central')
      .attr('class', 'mat-caption')
      .text('')

    circleBg.on('mouseenter', () => {
      circleStroke.style('stroke', 'black')
    })
    circleBg.on('mouseleave', () => {
      circleStroke.style('stroke', 'unset')
    })
    circleBg.on('click', function () {
      def.onActiveLineClick(chartData.activeLine, inspectedLinePoint)
    })


    const setInspector = (rangeX: number, domainX: number, linePoint: ChartLinePoint) => {

      const rangeY = scaleY(linePoint.y);
      verticalLine
        .attr('x1', rangeX)
        .attr('x2', rangeX)
        .style('stroke-width', 1);
      circleG
        .attr('transform', `translate(${rangeX},${rangeY})`)
        .style('visibility', 'visible');
      circleText
        .text(linePoint.y.toString())
    }
    const unsetInspector = () => {
      verticalLine
        .attr('x1', 0)
        .attr('x2', 0)
        .style('stroke-width', 0);
      circleG
        .attr('transform', `translate(${0},${0})`)
        .style('visibility', 'hidden');
      circleText
        .text('')
    }
    const setXAxisHoverLabel = (domainX: number, domainY: number, linePoint: ChartLinePoint) => {
      xAxisHoverLabel.text(def.config.labelFn(domainX, domainY, linePoint, activeLine))
    }
    const unsetXAxisHoverLabel = () => {
      xAxisHoverLabel.text('')
    }
    const setActiveLineLabel = () => {
      activeLineLabel.text(activeLine.label)
    }

    // add inspector on redraw
    if (activeLine && def.config.data.mouseX) {
      const domainX = scaleX.invert(def.config.data.mouseX)
      const linePoint = bisect(domainX, activeLine.linePoints);
      setInspector(def.config.data.mouseX, domainX, linePoint)
    }
    if (activeLine) {
      setActiveLineLabel()
    }
    // registers event listener for mouse move or touch move
    containerSvg.on('mousemove touchmove', function () {
      const [mouseX, mouseY] = d3.mouse(this);
      const domainX = scaleX.invert(mouseX)
      const domainY = scaleX.invert(mouseX)
      if (activeLine) {
        inspectedLinePoint = bisect(domainX, activeLine.linePoints);
        setInspector(mouseX, domainX, inspectedLinePoint)
      }
      setXAxisHoverLabel(domainX, domainY, inspectedLinePoint)
    })

    containerSvg.on('mouseleave touchend', function () {
      unsetInspector()
      unsetXAxisHoverLabel()
    })

    containerSvg.on('click', function () {
      if (activeLine) {
        def.deactivateLine()
      }
    })

  }
}
