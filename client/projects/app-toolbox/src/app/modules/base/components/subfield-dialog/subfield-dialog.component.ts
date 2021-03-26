import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Field, Subfield } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';

export interface SubfieldDialogData {
  title: string
  field: Field
  source: GvFieldSourceEntity
  scope: GvFieldPageScope
  showOntoInfo$: Observable<boolean>
}
@Component({
  selector: 'gv-subfield-dialog',
  templateUrl: './subfield-dialog.component.html',
  styleUrls: ['./subfield-dialog.component.scss']
})
export class SubfieldDialogComponent implements OnInit {
  subfield$: Observable<Subfield>
  constructor(
    public dialogRef: MatDialogRef<SubfieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubfieldDialogData,
  ) { }

  ngOnInit() {

  }

}
