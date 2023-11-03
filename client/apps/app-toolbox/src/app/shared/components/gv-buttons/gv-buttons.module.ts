import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleBtnComponent } from './components/toggle-btn/toggle-btn.component';



@NgModule({
  declarations: [
    ToggleBtnComponent
  ],
  exports: [
    ToggleBtnComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class GvButtonsModule { }
