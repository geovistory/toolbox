import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
