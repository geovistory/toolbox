import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'gv-geo-col-signal',
    templateUrl: './geo-col-signal.component.html',
    styleUrls: ['./geo-col-signal.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatTooltipModule]
})
export class GeoColSignalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
