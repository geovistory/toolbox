import { Injectable } from '@angular/core';
import { AccountFacade } from './account/account.facade';
import { ActiveProjectFacade } from './active-project/active-project.facade';
import { LoadingBarFacade } from './loading-bar/loading-bar.facade';
import { NotificationFacade } from './notification/notification.facade';

@Injectable({
  providedIn: 'root'
})
export class UiFacade {

  constructor(
    public loadingBar: LoadingBarFacade,
    public notifications: NotificationFacade,
    public activeProject: ActiveProjectFacade,
    public account: AccountFacade
  ) { }
}
