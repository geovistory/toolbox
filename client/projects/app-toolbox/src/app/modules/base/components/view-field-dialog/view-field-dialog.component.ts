import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';

export interface ViewFieldDialogData {
  title: string
  field: Field
  source: GvFieldSourceEntity
  scope: GvFieldPageScope
  showOntoInfo$: Observable<boolean>
}
@Component({
  selector: 'gv-view-field-dialog',
  templateUrl: './view-field-dialog.component.html',
  styleUrls: ['./view-field-dialog.component.scss']
})
export class ViewFieldDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewFieldDialogData,
  ) { }

  ngOnInit() {

  }

}
