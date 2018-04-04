import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { InfTemporalEntity } from 'app/core';
import { Timeline } from '../../models/timeline';

@Component({
  selector: '[teEntVisual]',
  templateUrl: './te-ent-visual.component.html',
  styleUrls: ['./te-ent-visual.component.scss']
})
export class TeEntVisualComponent implements DoCheck {

  timeline: Timeline;
  xAxis: XAxisDefinition;
  teEnt; //TODO Type of teEnt in Timeline is different then InfTemporalEntity, since it has ExistenceTime and Label --> TlEvent?

  @Input('teEntVisual') teEntOnXAxis: { temporalEntity: InfTemporalEntity, timeline: Timeline };

  constructor() { }

  ngDoCheck() {
    this.timeline = this.teEntOnXAxis.timeline;
    this.xAxis = this.teEntOnXAxis.timeline.xAxis;
    this.teEnt = this.teEntOnXAxis.temporalEntity;
  }

}
