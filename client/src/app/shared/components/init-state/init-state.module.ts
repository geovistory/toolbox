import { NgReduxFormModule } from '@angular-redux/form';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitStateComponent } from './init-state.component';
import { ActiveProjectModule } from 'app/core/active-project';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    RouterModule,
    ActiveProjectModule
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
