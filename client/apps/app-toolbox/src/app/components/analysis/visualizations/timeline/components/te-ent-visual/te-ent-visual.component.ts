import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeSpanPipe } from '@kleiolab/lib-utils';
import { Timeline, TimeLineRow } from '../../models/timeline';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { ExistenceTimeVisualComponent } from '../existence-time-visual/existence-time-visual.component';

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
