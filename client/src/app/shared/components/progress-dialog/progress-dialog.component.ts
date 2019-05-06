import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { Observable, BehaviorSubject, Subject } from '../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';

export type ProgressMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export interface ProgressDialogData {

  title?: string;

  // https://material.angular.io/components/progress-bar/api
  mode$: BehaviorSubject<ProgressMode>;

  // 0 to 100
  value$: BehaviorSubject<number>

  // if true, the progres percentage number is hidden 
  hideValue?: boolean;
}


@Component({
  selector: 'gv-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProgressDialogComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressDialogData) {

    // ref.detach();
  }

  ngOnInit() {
    this.data.value$.pipe(takeUntil(this.destroy$)).subscribe(v => {

    })
  }
  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

}
