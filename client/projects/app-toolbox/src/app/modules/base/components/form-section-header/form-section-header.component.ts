import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FieldSection } from '../form-create-data/form-create-data.component';

@Component({
  selector: 'gv-form-section-header',
  templateUrl: './form-section-header.component.html',
  styleUrls: ['./form-section-header.component.scss']
})
export class FormSectionHeaderComponent implements OnInit {

  @Input() section: FieldSection
  @Input() control: UntypedFormArray
  constructor() { }

  ngOnInit(): void {
  }

}
