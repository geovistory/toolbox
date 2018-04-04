import { Component, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';
import { D3Service } from '../../shared/d3.service';
import { Point } from '../../models/point';
import { Timeline } from '../../models/timeline';
import { InfTemporalEntity, TimePrimitive, InfPersistentItem, GregorianDateTime } from 'app/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';

export interface TimelineOptions {
  width: number,
  headerHeight: number, // height of header (where the labels of xAxis are displayed)
  bodyHeight: number, // height of scrollable body (where the existence times are displayed)
  domainStart: number, // julian day in seconds
  domainEnd: number,
  zoomFactor: number, // increase for smaller zoom steps
  rowHeight: number,
  rowPaddingBottom: number,
  rowPaddingTop: number,
  barHeight: number, // height of bars including the strockes of the brackets
  bracketStrokeWidth: number, // stroke width of left or right brackets of existence time visuals
  bracketWidth: number,  
  height?: number, // total height (sum of headerHeight and bodyHeight)
}

@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  @HostListener('scroll', ['$event'])

  @Input() persistentItems: InfPersistentItem[];


  private _options: TimelineOptions = {
    width: 600,
    bodyHeight: 180,
    headerHeight: 27,
    domainStart: 0,
    domainEnd: 2454000 * 60 * 60 * 24,
    zoomFactor: 3,
    rowHeight: 22,
    rowPaddingBottom: 5,
    rowPaddingTop: 5,
    barHeight: 14,
    bracketStrokeWidth: 2,
    bracketWidth:4
  };


  get options() {
    this._options.width = window.innerWidth - 100;
    this._options.height = this._options.headerHeight + this._options.bodyHeight;
    return this._options;
  }


  constructor(private d3Service: D3Service) {

  }

  timeline: Timeline;

  ngOnInit() {

    /** Receiving an initialized timeline from our custom d3 service */
    this.timeline = this.d3Service.getTimeline(this.persistentItems, this.options);
  }

  ngAfterViewInit() {
    this.timeline.init(this.options)
  }


  onDrag(rangeDiff) {

    this.timeline.move(rangeDiff);

  }


  zoomIn() {

    this.timeline.zoomIn()

  }

  zoomOut() {

    this.timeline.zoomOut()

  }

  zoomToExtent() {

    this.timeline.zoomToExtent()

  }


  onScroll(event) {
    console.log(event)
  }


}
