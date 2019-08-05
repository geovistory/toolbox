import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatExpansionModule, MatIconModule, MatTableModule } from '../../../../node_modules/@angular/material';
import { ClassConfigDialogComponent } from './components/class-config-dialog/class-config-dialog.component';
import { ClassConfigComponent } from './components/class-config/class-config.component';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [ClassConfigComponent, ClassConfigDialogComponent],
  entryComponents: [ClassConfigDialogComponent]
})
export class ClassConfigModule { }
