import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlMessagesModule } from 'projects/toolbox/src/app/shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule
  ],
  declarations: [LanguageSearchTypeaheadComponent],
  exports: [LanguageSearchTypeaheadComponent]
})
export class LanguageSearchTypeaheadModule { }
