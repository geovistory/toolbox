import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FieldSection } from '../form-create-data/form-create-data.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-form-section-header',
    templateUrl: './form-section-header.component.html',
    styleUrls: ['./form-section-header.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule]
})
export class FormSectionHeaderComponent implements OnInit {

  @Input() section: FieldSection
  @Input() control: UntypedFormArray
  constructor() { }

  ngOnInit(): void {
  }

}
