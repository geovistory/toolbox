import { Component, OnInit, Input } from '@angular/core';
import { MapAndTimeContFormControlFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassAndTypeSelectComponent } from '../../../queries/components/class-and-type-select/class-and-type-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-map-and-time-cont-form-control',
    templateUrl: './map-and-time-cont-form-control.component.html',
    styleUrls: ['./map-and-time-cont-form-control.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, ClassAndTypeSelectComponent, FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class MapAndTimeContFormControlComponent implements OnInit {
  @Input() formControlFactory: MapAndTimeContFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
