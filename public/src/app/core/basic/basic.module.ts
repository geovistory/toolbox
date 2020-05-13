import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicService } from './basic.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BasicService
  ],
  declarations: []
})
export class BasicModule { }
