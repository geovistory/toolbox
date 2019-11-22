import { Component, Input, OnInit } from '@angular/core';
import { MapAndTimeContFormArrayFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-array',
  templateUrl: './map-and-time-cont-form-array.component.html',
  styleUrls: ['./map-and-time-cont-form-array.component.scss']
})
export class MapAndTimeContFormArrayComponent implements OnInit {
  @Input() formArrayFactory: MapAndTimeContFormArrayFactory;

  constructor() { }

  ngOnInit() {
    console.log(this.formArrayFactory.children)
  }


}
