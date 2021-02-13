import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
let LanguageSearchTypeaheadModule = class LanguageSearchTypeaheadModule {
};
LanguageSearchTypeaheadModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgbTypeaheadModule
        ],
        declarations: [LanguageSearchTypeaheadComponent],
        exports: [LanguageSearchTypeaheadComponent]
    })
], LanguageSearchTypeaheadModule);
export { LanguageSearchTypeaheadModule };
//# sourceMappingURL=language-search-typeahead.module.js.map