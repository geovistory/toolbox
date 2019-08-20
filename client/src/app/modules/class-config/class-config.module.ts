import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatTableModule, MatInputModule, MatProgressSpinnerModule, MatTooltipModule, MatDialogModule } from '../../../../node_modules/@angular/material';
import { ClassConfigDialogComponent } from './components/class-config-dialog/class-config-dialog.component';
import { ClassConfigComponent } from './components/class-config/class-config.component';
import { PropertyLabelTableComponent } from './components/property-label-table/property-label-table.component';
import { LanguageSearchTypeaheadModule } from 'app/shared';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    LanguageSearchTypeaheadModule
  ],
  declarations: [ClassConfigComponent, ClassConfigDialogComponent, PropertyLabelTableComponent],
  entryComponents: [ClassConfigDialogComponent]
})
export class ClassConfigModule { }
