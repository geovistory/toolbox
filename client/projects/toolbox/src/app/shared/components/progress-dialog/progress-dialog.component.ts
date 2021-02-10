import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, auditTime } from 'rxjs/operators';

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

  value$: Observable<number>
  constructor(
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressDialogData) {

    // ref.detach();
  }

  ngOnInit() {
    this.value$ = this.data.value$.pipe(auditTime(500));
    this.data.mode$.pipe(auditTime(500), takeUntil(this.destroy$)).subscribe(v => {
      // console.log(v)
    })
  }
  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

}
