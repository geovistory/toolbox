import { Component, OnInit, HostBinding } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'gv-time-col-signal',
    templateUrl: './time-col-signal.component.html',
    styleUrls: ['./time-col-signal.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatTooltipModule]
})
export class TimeColSignalComponent implements OnInit {
  @HostBinding('class.d-inline') dInline = true;
  
  constructor() { }

  ngOnInit() {
  }

}
