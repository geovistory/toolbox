import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(public dialogRef: MatDialogRef<FieldConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FieldConfigDialogData,
  ) { }

  ngOnInit() {
  }

}