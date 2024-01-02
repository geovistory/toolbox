import { Component, OnInit, Input } from '@angular/core';
import { TccFormControlFactory } from '../time-chart-cont-form/time-chart-cont-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-time-chart-cont-form-control',
    templateUrl: './time-chart-cont-form-control.component.html',
    styleUrls: ['./time-chart-cont-form-control.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule]
})
export class TimeChartContFormControlComponent implements OnInit {
  @Input() formControlFactory: TccFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
