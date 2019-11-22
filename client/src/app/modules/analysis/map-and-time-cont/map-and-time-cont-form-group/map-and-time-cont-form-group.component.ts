import { Component, Input, OnInit } from '@angular/core';
import { MapAndTimeContFormGroupFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-group',
  templateUrl: './map-and-time-cont-form-group.component.html',
  styleUrls: ['./map-and-time-cont-form-group.component.scss']
})
export class MapAndTimeContFormGroupComponent implements OnInit {
  @Input() formGroupFactory: MapAndTimeContFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
