import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeysPipe,
  ],
  exports: [
    KeysPipe
  ]
})
export class KeysModule { }
