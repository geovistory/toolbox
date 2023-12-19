import { Component, DoCheck, Input, Output, EventEmitter } from '@angular/core';

import { Timeline, TimeLineRow } from '../../models/timeline';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { TimeSpanPipe } from '../../../../../../../../libs/lib-utils/src/lib/date-time/pipes/time-span.pipe';
import { ExistenceTimeVisualComponent } from '../existence-time-visual/existence-time-visual.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';

@Component({
    selector: '[teEntVisual]',
    templateUrl: './te-ent-visual.component.html',
    styleUrls: ['./te-ent-visual.component.scss'],
    standalone: true,
    imports: [NgClass, MatTooltipModule, ExistenceTimeVisualComponent, TimeSpanPipe]
})
export class TeEntVisualComponent implements DoCheck {

  timeline: Timeline;
  xAxis: XAxisDefinition;
  row: TimeLineRow;

  @Input('teEntVisual') teEntOnXAxis: { row: TimeLineRow, timeline: Timeline };

  @Output() rowMouseEnter = new EventEmitter<TimeLineRow>();
  @Output() rowMouseLeave = new EventEmitter<TimeLineRow>();
  @Output() rowClick = new EventEmitter<TimeLineRow>();

  constructor() { }

  ngDoCheck() {
    this.timeline = this.teEntOnXAxis.timeline;
    this.xAxis = this.teEntOnXAxis.timeline.xAxis;
    this.row = this.teEntOnXAxis.row;
  }

  mouseenter() {
    this.rowMouseEnter.emit(this.row)
  }

  mouseleave() {
    this.rowMouseLeave.emit(this.row)
  }

  click() {
    this.rowClick.emit(this.row)
  }
}
