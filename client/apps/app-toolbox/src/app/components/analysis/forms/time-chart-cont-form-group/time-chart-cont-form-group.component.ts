import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeChartContFormArrayComponent } from '../time-chart-cont-form-array/time-chart-cont-form-array.component';
import { TccFormGroupFactory } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-form-group',
  templateUrl: './time-chart-cont-form-group.component.html',
  styleUrls: ['./time-chart-cont-form-group.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, TimeChartContFormArrayComponent]
})
export class TimeChartContFormGroupComponent {
  @Input() formGroupFactory: TccFormGroupFactory
}
