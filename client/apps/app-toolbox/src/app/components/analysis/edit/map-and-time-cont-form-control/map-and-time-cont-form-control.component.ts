import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassAndTypeSelectComponent } from 'apps/app-toolbox/src/app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { MapAndTimeContFormControlFactory } from '../../../../components/analysis/edit/map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-control',
  templateUrl: './map-and-time-cont-form-control.component.html',
  styleUrls: ['./map-and-time-cont-form-control.component.scss'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, ClassAndTypeSelectComponent, FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class MapAndTimeContFormControlComponent {
  @Input() formControlFactory: MapAndTimeContFormControlFactory;
}
