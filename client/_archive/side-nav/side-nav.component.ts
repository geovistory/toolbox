import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'gv-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnChanges {

  @Input() projectLabel: string;
  @Input() levelsBelowSettings: number;

  routePrefix: string;

  constructor() { }

  ngOnChanges() {

    this.routePrefix = '';
    for (let i = 0; i < this.levelsBelowSettings; i++) {
        this.routePrefix = this.routePrefix + '../';
    }
  }

}
