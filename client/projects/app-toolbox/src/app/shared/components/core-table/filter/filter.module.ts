import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { CoreTableFilterComponent } from './filter.component';

const components = [CoreTableFilterComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class CoreTableFilterModule { }
