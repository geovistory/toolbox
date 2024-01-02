import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapAndTimeContFormArrayComponent } from '../map-and-time-cont-form-array/map-and-time-cont-form-array.component';
import { MapAndTimeContFormGroupFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-group',
  templateUrl: './map-and-time-cont-form-group.component.html',
  styleUrls: ['./map-and-time-cont-form-group.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, MapAndTimeContFormArrayComponent]
})
export class MapAndTimeContFormGroupComponent {
  @Input() formGroupFactory: MapAndTimeContFormGroupFactory
}
