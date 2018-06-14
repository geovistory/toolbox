import { Component, DoCheck, Input } from '@angular/core';

import { Timeline, TimeLineRow } from '../../models/timeline';
import { XAxisDefinition } from '../../models/x-axis-definition';

@Component({
  selector: '[teEntVisual]',
  templateUrl: './te-ent-visual.component.html',
  styleUrls: ['./te-ent-visual.component.scss']
})
export class TeEntVisualComponent implements DoCheck {

  timeline: Timeline;
  xAxis: XAxisDefinition;
  row:TimeLineRow; 
  
  @Input('teEntVisual') teEntOnXAxis: { row: TimeLineRow, timeline: Timeline };

  constructor() { }

  ngDoCheck() {
    this.timeline = this.teEntOnXAxis.timeline;
    this.xAxis = this.teEntOnXAxis.timeline.xAxis;
    this.row = this.teEntOnXAxis.row;
  }

}
