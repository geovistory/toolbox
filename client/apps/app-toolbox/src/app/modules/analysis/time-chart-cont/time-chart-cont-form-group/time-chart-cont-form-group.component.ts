import { Component, Input, OnInit } from '@angular/core';
import { TccFormGroupFactory } from '../time-chart-cont-form/time-chart-cont-form.component';
import { TimeChartContFormArrayComponent } from '../time-chart-cont-form-array/time-chart-cont-form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-time-chart-cont-form-group',
    templateUrl: './time-chart-cont-form-group.component.html',
    styleUrls: ['./time-chart-cont-form-group.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, TimeChartContFormArrayComponent]
})
export class TimeChartContFormGroupComponent implements OnInit {
  @Input() formGroupFactory: TccFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
