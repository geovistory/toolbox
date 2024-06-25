import { Component, OnInit, Input } from '@angular/core';
import { QfFormGroupFactory } from '../query-filter/query-filter.component';
import { QfFormArrayComponent } from '../qf-form-array/qf-form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-qf-form-group',
    templateUrl: './qf-form-group.component.html',
    styleUrls: ['./qf-form-group.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, QfFormArrayComponent]
})
export class QfFormGroupComponent implements OnInit {

  @Input() formGroupFactory: QfFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
