import { Component, OnInit, Input } from '@angular/core';
import { MapAndTimeContFormControlFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-control',
  templateUrl: './map-and-time-cont-form-control.component.html',
  styleUrls: ['./map-and-time-cont-form-control.component.scss']
})
export class MapAndTimeContFormControlComponent implements OnInit {
  @Input() formControlFactory: MapAndTimeContFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
