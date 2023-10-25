import { Component } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingBarJobs$: Observable<number>;
  constructor(
    state: StateFacade
  ) {
    this.loadingBarJobs$ = state.ui.loadingBar.loadingBarCount$;
  }



}
