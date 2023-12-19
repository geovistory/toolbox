import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateFacade } from "@kleiolab/lib-redux";
import { ActiveAccountService } from './active-account.service';



@Injectable()
export class SystemAdminGuard {

  constructor(
    private activeAccountService: ActiveAccountService,
    private state: StateFacade,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    // if system_admin role in store, emit true
    const s = this.state.getState();
    if (s?.ui?.account?.roles?.find(role => role.name === 'system_admin')) true;

    // else start loading the roles etc...
    await this.activeAccountService.isSystemAdmin().then((bool => {
      if (bool === false) this.router.navigate(['/access-denied']);
    }));
    return true
  }

}
