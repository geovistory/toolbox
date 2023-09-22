import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingBarJobs$: Observable<number>;
  constructor(
    ngRedux: NgRedux<IAppState>
  ) {
    this.loadingBarJobs$ = ngRedux.select<number>(['loadingBar', 'runningJobsCount']);
  }



}
