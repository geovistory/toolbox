import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { SysStatusSocket } from '@kleiolab/lib-sockets';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  warehouseInitializing = false
  loadingBarJobs$: Observable<number>;
  constructor(
    private status: SysStatusSocket,
    private ngRedux: NgRedux<IAppState>
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.status.on('warehouseInitializing', (message: boolean) => {
      this.warehouseInitializing = message
    })
    this.loadingBarJobs$ = ngRedux.select<number>(['loadingBar', 'runningJobsCount']);
  }



}
