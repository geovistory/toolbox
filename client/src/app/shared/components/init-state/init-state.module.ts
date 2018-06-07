import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitStateComponent } from './init-state.component';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxFormModule } from '@angular-redux/form';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
        
  ],
  declarations: [
    InitStateComponent
  ],
  exports:[
    InitStateComponent,
    NgReduxFormModule 
  ]
})
export class InitStateModule { }
