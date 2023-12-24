import { Component, OnInit, Input } from '@angular/core';
import { FormGroupFactory } from '../../../modules/form-factory/core/form-group-factory';
import { FormArrayComponent } from '../form-array/form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
    selector: 'gv-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, FormArrayComponent]
})
export class FormGroupComponent implements OnInit {

  @Input() formGroupFactory: FormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
