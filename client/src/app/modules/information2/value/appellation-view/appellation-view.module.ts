import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppellationService } from '../../shared/appellation.service';
import { AppellationViewComponent } from './appellation-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppellationViewComponent,
  ],
  providers: [
    AppellationService
  ],
  exports: [
    AppellationViewComponent
  ]
})
export class AppellationViewModule { }
