import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReduxQueriesModule } from '@kleiolab/lib-queries';
import { StoreModule } from '@ngrx/store';
import { InitStateComponent } from './init-state.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    RouterModule,
    ReduxQueriesModule
  ],
  declarations: [
    InitStateComponent
  ],
  exports: [
    InitStateComponent,
    // NgReduxFormModule
  ]
})
export class InitStateModule { }
