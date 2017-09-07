import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';
import { User } from '../sdk/models/User';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { UserApi } from '../sdk/services/custom/User';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';

@Injectable()
export class ActiveAccountService {
  private userObs$ = new Subject<User>();

  user: User;
  redirectUrl:string;

  constructor(
    private authService: LoopBackAuth,
    private userApi: UserApi,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  getUser() {
    return this.userObs$;
  }

  updateUser() {
    this.user = this.authService.getCurrentUserData();
    this.userObs$.next(this.user);
  }

  isLoggedIn(){
    return this.authService.getCurrentUserId() ? true : false;
  }

}