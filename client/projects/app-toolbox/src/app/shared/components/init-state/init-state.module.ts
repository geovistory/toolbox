import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReduxQueriesModule } from '@kleiolab/lib-queries';
import { ReduxModule } from '@kleiolab/lib-redux';
import { InitStateComponent } from './init-state.component';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    RouterModule,
    ReduxModule,
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
