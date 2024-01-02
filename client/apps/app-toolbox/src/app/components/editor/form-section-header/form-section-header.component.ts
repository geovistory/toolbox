import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { FieldSection } from '../form-create-data/form-create-data.component';

@Component({
  selector: 'gv-form-section-header',
  templateUrl: './form-section-header.component.html',
  styleUrls: ['./form-section-header.component.scss'],
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule]
})
export class FormSectionHeaderComponent {

  @Input() section: FieldSection
  @Input() control: UntypedFormArray

}
