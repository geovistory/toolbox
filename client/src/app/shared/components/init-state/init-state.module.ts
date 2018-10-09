import { NgReduxFormModule } from '@angular-redux/form';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitStateComponent } from './init-state.component';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    RouterModule
  ],
  declarations: [
    InitStateComponent
  ],
  exports: [
    InitStateComponent,
    NgReduxFormModule
  ]
})
export class InitStateModule { }
