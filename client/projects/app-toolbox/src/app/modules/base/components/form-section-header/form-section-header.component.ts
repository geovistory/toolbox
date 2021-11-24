import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FieldSection } from '../form-create-entity/form-create-entity.component';

@Component({
  selector: 'gv-form-section-header',
  templateUrl: './form-section-header.component.html',
  styleUrls: ['./form-section-header.component.scss']
})
export class FormSectionHeaderComponent implements OnInit {

  @Input() section: FieldSection
  @Input() control: FormArray
  constructor() { }

  ngOnInit(): void {
  }

}
