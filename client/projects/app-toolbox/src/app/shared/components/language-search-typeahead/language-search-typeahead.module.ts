import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LanguageSearchTypeaheadComponent],
  exports: [LanguageSearchTypeaheadComponent]
})
export class LanguageSearchTypeaheadModule { }
