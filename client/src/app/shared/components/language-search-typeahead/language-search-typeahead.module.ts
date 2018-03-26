import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  declarations: [LanguageSearchTypeaheadComponent],
  exports: [LanguageSearchTypeaheadComponent]
})
export class LanguageSearchTypeaheadModule { }
