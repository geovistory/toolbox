import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LanguageCtrlComponent } from './language-ctrl.component';
import { LanguageSearchTypeaheadModule } from 'app/shared';

@NgModule({
  imports: [
    CommonModule,
    LanguageSearchTypeaheadModule,
    ReactiveFormsModule
  ],
  declarations: [
    LanguageCtrlComponent,
  ],
  providers: [
    FormBuilder
  ],
  exports: [
    LanguageCtrlComponent
  ]
})
export class LanguageCtrlModule { }
