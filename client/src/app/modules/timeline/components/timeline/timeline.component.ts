import { Component, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';
import { D3Service } from '../../shared/d3.service';
import { Point } from '../../models/point';
import { Timeline } from '../../models/timeline';
import { InfTemporalEntity, TimePrimitive, InfPersistentItem } from 'app/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';

export interface TimelineOptions {
  width: number,
  height: number,
  domainStart: Date,
  domainEnd: Date,
  zoomFactor: number, // increase for smaller zoom steps
  barHeight: number, // pixels
  barMarginBottom: number // pixels
}

@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  @HostListener('scroll', ['$event'])

  @Input() persistentItems:InfPersistentItem[];




  private _options: TimelineOptions = {
    width: 600,
    height: 400,
    domainStart: new Date(1000, 0, 1),
    domainEnd: new Date(2000, 0, 1),
    zoomFactor: 8,
    barHeight: TimePrimitiveVisual.barHeight,
    barMarginBottom: 20
  };


  get options() {
    this._options.width = window.innerWidth - 100;
    this._options.height = window.innerHeight - 300;
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

  changeDomain() {
    this.options.domainEnd = new Date(1000, 0, 1);
    this.options.domainEnd = new Date(2000, 0, 1);
    this.timeline.init(this.options)
  }

  onDrag(rangeDiff) {

    this.timeline.move(rangeDiff);
  
  }


  zoomIn(){

    this.timeline.zoomIn()

  }

  zoomOut(){

    this.timeline.zoomOut()

  }

  zoomToExtent(){

    this.timeline.zoomToExtent()

  }


  onScroll(event){
    console.log(event)
  }


}
