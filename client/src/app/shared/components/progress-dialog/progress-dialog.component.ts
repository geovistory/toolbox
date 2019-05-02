import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { Observable, BehaviorSubject } from '../../../../../node_modules/rxjs';

export type ProgressMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export interface ProgressDialogData {

  // https://material.angular.io/components/progress-bar/api
  mode$: BehaviorSubject<ProgressMode>;

  // 0 to 100
  value$: BehaviorSubject<number>

}


@Component({
  selector: 'gv-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss']
})
export class ProgressDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressDialogData) { }

  ngOnInit() {
  }

}
