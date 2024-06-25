import { Component, Input, OnInit } from '@angular/core';
import { QueryPathFormGroupFactory } from '../query-path-form/query-path-form.component';
import { QueryPathFormArrayComponent } from '../query-path-form-array/query-path-form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-query-path-form-group',
    templateUrl: './query-path-form-group.component.html',
    styleUrls: ['./query-path-form-group.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, QueryPathFormArrayComponent]
})
export class QueryPathFormGroupComponent implements OnInit {
  @Input() formGroupFactory: QueryPathFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
