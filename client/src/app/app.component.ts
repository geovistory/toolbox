import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { LoopBackConfig } from './core';
import { SysStatusSocket } from './core/sockets/sockets.module';

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
