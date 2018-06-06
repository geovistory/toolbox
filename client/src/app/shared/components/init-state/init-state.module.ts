import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitStateComponent } from './init-state.component';
import { NgReduxModule } from '@angular-redux/store';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule    
  ],
  declarations: [
    InitStateComponent
  ],
  exports:[
    InitStateComponent    
  ]
})
export class InitStateModule { }
