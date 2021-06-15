import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  declarations: [
    ControlMessagesComponent
  ],
  exports: [
    ControlMessagesComponent
  ]
})
export class ControlMessagesModule { }
