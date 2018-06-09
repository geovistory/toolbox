import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LanguageViewComponent } from './language-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LanguageViewComponent,
  ],
  providers: [
  ],
  exports:[
    LanguageViewComponent    
  ]
})
export class LanguageViewModule { }
