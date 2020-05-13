import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { LoadingBarActions } from './api/loading-bar.actions';
import { LoadingBarEpics } from './api/loading-bar.epics';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    SlimLoadingBarModule
  ],
  providers: [LoadingBarActions, LoadingBarEpics],
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent]
})
export class LoadingBarModule { }
