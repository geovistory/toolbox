import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, Subject, interval, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'gv-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatProgressBarModule, NgClass, MatTooltipModule, AsyncPipe]
})
export class LoadingBarComponent implements OnInit {
  visible$ = new BehaviorSubject(false);
  mode$ = new BehaviorSubject<ProgressBarMode>('indeterminate');
  value$ = new BehaviorSubject(0);
  @Input() jobs$: Observable<number>;
  jobs = 0;
  value = 0
  complete$ = new Subject<void>();

  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
    if (!this.jobs$) throw new Error('@Input() jobs$ must be defined.');
    let lastJobs = 0;
    this.jobs$.subscribe(jobs => {
      this.jobs = jobs;
      if (lastJobs > 0 && jobs === 0) this.complete();
      else if (lastJobs === 0 && jobs > 0) this.start();
      lastJobs = jobs;
    });

  }
  async complete() {
    this.complete$.next()
    interval(40).pipe(
      take(25),
      takeUntil(this.complete$),
      tap((a) => {
        if (a == 0) this.mode$.next('determinate');
        if (a <= 10) this.value$.next(a * 10);
        if (a === 24) this.visible$.next(false);
        if (a <= 10 || a === 24) this.ref.detectChanges()
      })).subscribe()
  }
  start() {
    this.visible$.next(true);
    this.mode$.next('indeterminate');
  }
}
