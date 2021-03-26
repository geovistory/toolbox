import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'gv-time-col-signal',
  templateUrl: './time-col-signal.component.html',
  styleUrls: ['./time-col-signal.component.scss']
})
export class TimeColSignalComponent implements OnInit {
  @HostBinding('class.d-inline') dInline = true;
  
  constructor() { }

  ngOnInit() {
  }

}
