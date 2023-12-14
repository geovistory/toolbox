import { Component, Input, OnInit } from '@angular/core';
import { MapAndTimeContFormGroupFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';
import { MapAndTimeContFormArrayComponent } from '../map-and-time-cont-form-array/map-and-time-cont-form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-map-and-time-cont-form-group',
    templateUrl: './map-and-time-cont-form-group.component.html',
    styleUrls: ['./map-and-time-cont-form-group.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, MapAndTimeContFormArrayComponent]
})
export class MapAndTimeContFormGroupComponent implements OnInit {
  @Input() formGroupFactory: MapAndTimeContFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
