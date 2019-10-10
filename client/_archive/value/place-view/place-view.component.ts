import { Component, OnInit, Input } from '@angular/core';
import { InfRole } from 'app/core';

@Component({
  selector: 'gv-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss']
})
export class PlaceViewComponent implements OnInit {

  @Input() role: InfRole;

  lat:number;
  long:number;

  constructor() { }

  ngOnInit() {
    this.lat = this.role.place.lat;
    this.long = this.role.place.long;
  }

}
