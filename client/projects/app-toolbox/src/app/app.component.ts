import { Component } from '@angular/core';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { SysStatusSocket } from "@kleiolab/lib-sockets";

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  warehouseInitializing = false
  constructor(
    private status: SysStatusSocket,

  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.status.on('warehouseInitializing', (message: boolean) => {
      this.warehouseInitializing = message
    })

  }



}