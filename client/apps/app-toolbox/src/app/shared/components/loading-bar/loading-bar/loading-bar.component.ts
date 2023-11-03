import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-loading-bar',
  templateUrl: './loading-bar.component.html',
})
export class LoadingBarComponent implements OnInit {
  visible = false;
  mode: ProgressBarMode;
  value: number;
  @Input() jobs$: Observable<number>;
  jobs = 0;
  constructor() { }
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
        this.mode = 'determinate';
        this.value = i;
        if (i === 100) {
          setTimeout(() => {
            if (this.jobs === 0) this.visible = false;
          }, 300);
        }
      }, i * 4);
    }
  }
  start() {
    this.visible = true;
    this.mode = 'indeterminate';
  }
}
