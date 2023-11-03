import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../core/material/material.module';
import { ClassDropdownComponent } from './class-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MaterialModule
  ],
  declarations: [ClassDropdownComponent],
  exports: [ClassDropdownComponent]
})
export class ClassDropdownModule { }
