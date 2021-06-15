import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface FieldConfigDialogData {
  fkProject: number,

  fkProperty: number
  fkPropertyDomain?: number
  fkPropertyRange?: number
}
@Component({
  selector: 'gv-field-config-dialog',
  templateUrl: './field-config-dialog.component.html',
  styleUrls: ['./field-config-dialog.component.scss']
})
export class FieldConfigDialogComponent implements OnInit {

  isOutgoing: boolean
  fkSource: number
  constructor(public dialogRef: MatDialogRef<FieldConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FieldConfigDialogData,
  ) {
    this.isOutgoing = !!data.fkPropertyDomain
    this.fkSource = this.isOutgoing ? data.fkPropertyDomain : data.fkPropertyRange
  }

  ngOnInit() {
  }

}
