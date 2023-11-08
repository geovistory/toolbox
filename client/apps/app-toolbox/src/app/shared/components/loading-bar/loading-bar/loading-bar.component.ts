import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'gv-loading-bar',
  templateUrl: './loading-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
  visible$ = new BehaviorSubject(false);
  mode$ = new BehaviorSubject<ProgressBarMode>('indeterminate');
  value$ = new BehaviorSubject(0);
  @Input() jobs$: Observable<number>;
  jobs = 0;
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
  complete() {
    for (let i = 0; i <= 100; i = i + 10) {
      setTimeout(() => {
        this.mode$.next('determinate');
        this.value$.next(i);
        if (i === 100) {
          setTimeout(() => {
            if (this.jobs === 0) this.visible$.next(false);
          }, 300);
        }
      }, i * 4);
    }
  }
  start() {
    this.visible$.next(true);
    this.mode$.next('indeterminate');
  }
}
