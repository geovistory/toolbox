import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
} from '@angular/material';
import { CoreTableFilterComponent } from './filter.component';

const components = [CoreTableFilterComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class CoreTableFilterModule {}
