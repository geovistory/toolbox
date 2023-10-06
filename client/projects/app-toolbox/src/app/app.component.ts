import { Component } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingBarJobs$: Observable<number>;
  constructor(
    store: Store<IAppState>
  ) {
    this.loadingBarJobs$ = store.select<number>((s) => s?.loadingBar?.runningJobsCount);
  }



}
