import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../core/material/material.module';
import { CoreTableFilterComponent } from './filter.component';

const components = [CoreTableFilterComponent];

@NgModule({
    exports: components,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        ...components
    ],
})
export class CoreTableFilterModule { }
