import { Component, OnInit, Input } from '@angular/core';
import { InfTimePrimitive } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'gv-time-primitive-view',
  templateUrl: './time-primitive-view.component.html',
  styleUrls: ['./time-primitive-view.component.scss'],
  providers: [DatePipe]
})
export class TimePrimitiveViewComponent implements OnInit {

  @Input() timePrimitive: TimePrimitive;
  @Input() calendar: CalendarType;
  @Input() show:
    'duration' // shows duration of DateTime
    | 'firstSecond'  // shows first second of DateTime
    | 'lastSecond'; // show last second DateTime

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }


  get displayLabel(): string {

    let tp = new TimePrimitive(this.timePrimitive)

    let dt = tp.getDateTime(this.calendar);

    switch (this.show) {

      case "duration":
        return this.datePipe.transform(dt.getDate(), tp.getShortesDateFormatString());

      case "firstSecond":
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      case "lastSecond":
        dt.toLastSecondOf(this.timePrimitive.duration);
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      default:
        return '';

    }
  }
}
