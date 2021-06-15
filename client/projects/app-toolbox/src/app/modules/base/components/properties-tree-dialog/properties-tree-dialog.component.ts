import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PropertiesTreeDialogData {
  source: GvFieldSourceEntity
  pkClass$: Observable<number>
  showOntoInfo$: Observable<boolean>;
  appContext: number;
  readonly$: BehaviorSubject<boolean>
}

@Component({
  selector: 'gv-properties-tree-dialog',
  templateUrl: './properties-tree-dialog.component.html',
  styleUrls: ['./properties-tree-dialog.component.scss']
})
export class PropertiesTreeDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<PropertiesTreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertiesTreeDialogData
  ) { }

  ngOnInit() {
  }

}
