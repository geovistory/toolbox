import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { Timeline, TimeLineRow } from '../../models/timeline';

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
