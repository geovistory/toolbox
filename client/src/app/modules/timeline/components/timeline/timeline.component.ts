import { Component, OnInit, AfterViewInit } from '@angular/core';
import { D3Service } from '../../shared/d3.service';
import { Point } from '../../models/point';
import { Timeline } from '../../models/timeline';

export interface TimelineOptions {
  width: number,
  height: number,
  domainStart: number,
  domainEnd: number,
}

@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  points: Point[];  

  readonly ZOOMFACTOR = 8;

  private _options: TimelineOptions = {
    width: 600,
    height: 400,
    domainStart: 100,
    domainEnd: 505
  };


  get options() {
    this._options.width = window.innerWidth - 100;
    this._options.height = window.innerHeight - 300;
    return this._options;
  }


  constructor(private d3Service: D3Service) {

    /**
     * Mock some data
     */
    this.points = [
      new Point(250, 300, 'Punkt 1'),
      new Point(500, 80, 'Punkt 2')
    ]

  }

  timeline: Timeline;

  ngOnInit() {

    /** Receiving an initialized timeline from our custom d3 service */
    this.timeline = this.d3Service.getTimeline(this.points, this.options);

  }

  ngAfterViewInit() {
    this.timeline.init(this.options)
  }

  changeDomain() {
    this.options.domainEnd = 0;
    this.options.domainEnd = 800;
    this.timeline.init(this.options)
  }

  onDrag(obj) {
    /** convert dif in range (pixels) to dif in domain */

    const start = this.timeline.xAxis.scale.invert(obj.startX);
    const end = this.timeline.xAxis.scale.invert(obj.endX);
    const domainDiff = start-end;
    this.options.domainStart += domainDiff;
    this.options.domainEnd += domainDiff;

    this.timeline.init(this.options)
  }

  zoomIn(){
    const minMax = this.options.domainEnd - this.options.domainStart;

    const diff = minMax / this.ZOOMFACTOR;

    this.options.domainEnd -= diff;

    this.options.domainStart += diff;

    this.timeline.init(this.options)
  }

  zoomOut(){
    const minMax = this.options.domainEnd - this.options.domainStart;

    const diff = minMax / this.ZOOMFACTOR;

    this.options.domainEnd += diff;

    this.options.domainStart -= diff;

    this.timeline.init(this.options)
  }


}
