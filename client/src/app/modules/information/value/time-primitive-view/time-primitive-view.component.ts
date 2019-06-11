import { Component, Input, OnInit } from '@angular/core';
import { InfRole } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';
import { infRole2TimePrimitive } from '../../information.helpers';

@Component({
  selector: 'gv-time-primitive-view',
  templateUrl: './time-primitive-view.component.html',
  styleUrls: ['./time-primitive-view.component.scss']
})
export class TimePrimitiveViewComponent implements OnInit {

  @Input() role: InfRole;
  @Input() show:
  'duration' // shows duration of DateTime
  | 'firstSecond'  // shows first second of DateTime
  | 'lastSecond'; // show last second DateTime


  calendar: CalendarType;
  timePrimitive: TimePrimitive;

  constructor() { }

  ngOnInit() {
    this.timePrimitive = infRole2TimePrimitive(this.role)
  }
}
