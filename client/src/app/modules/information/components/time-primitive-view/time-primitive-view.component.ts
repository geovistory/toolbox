import { Component, OnInit, Input } from '@angular/core';
import { InfTimePrimitive } from '../../../../core';

@Component({
  selector: 'gv-time-primitive-view',
  templateUrl: './time-primitive-view.component.html',
  styleUrls: ['./time-primitive-view.component.scss']
})
export class TimePrimitiveViewComponent implements OnInit {

  @Input() timePrimitive: InfTimePrimitive;

  constructor() { }

  ngOnInit() {
  }

}
