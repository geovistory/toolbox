import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule } from '../../../../../node_modules/@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  declarations: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
