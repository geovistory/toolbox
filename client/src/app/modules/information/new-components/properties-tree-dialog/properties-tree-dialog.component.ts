import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PropertiesTreeDialogData {
  pkEntity$: Observable<number>
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
