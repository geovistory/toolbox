import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FieldLabelComponent } from '../../editor/field-label/field-label.component';
import { FieldConfigComponent } from '../field-config/field-config.component';
export interface FieldConfigDialogData {
  fkProject: number,

  fkProperty: number
  fkPropertyDomain?: number
  fkPropertyRange?: number
}
@Component({
  selector: 'gv-field-config-dialog',
  templateUrl: './field-config-dialog.component.html',
  styleUrls: ['./field-config-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, FieldLabelComponent, FieldConfigComponent, MatButtonModule]
})
export class FieldConfigDialogComponent {

  isOutgoing: boolean
  fkSource: number
  constructor(public dialogRef: MatDialogRef<FieldConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FieldConfigDialogData,
  ) {
    this.isOutgoing = !!data.fkPropertyDomain
    this.fkSource = this.isOutgoing ? data.fkPropertyDomain : data.fkPropertyRange
  }
}
