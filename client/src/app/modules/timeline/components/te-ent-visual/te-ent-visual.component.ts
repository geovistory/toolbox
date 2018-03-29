import { Component, OnInit, Input } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { InfTemporalEntity } from 'app/core';

@Component({
  selector: '[teEntVisual]',
  templateUrl: './te-ent-visual.component.html',
  styleUrls: ['./te-ent-visual.component.scss']
})
export class TeEntVisualComponent implements OnInit {

  @Input('teEntVisual') teEntOnXAxis : {temporalEntity:InfTemporalEntity, xAxis:XAxisDefinition};

  constructor() { }

  ngOnInit() {
  }

}
