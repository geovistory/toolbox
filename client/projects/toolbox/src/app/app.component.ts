import { Component } from '@angular/core';
import { environment } from 'projects/toolbox/src/environments/environment';
import { LoopBackConfig } from 'projects/toolbox/src/app/core/sdk';
import { SysStatusSocket } from 'projects/toolbox/src/app/core/sockets/sockets.module';

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
