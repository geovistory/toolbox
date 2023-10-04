import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IAppState } from "@kleiolab/lib-redux";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActiveAccountService } from '../active-account/active-account.service';



@Injectable()
export class SystemAdminGuard  {

  constructor(
    private activeAccountService: ActiveAccountService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;

    // if system_admin role in store, emit true
    const s = this.ngRedux.getState();
    if (
      s.account &&
      s.account.roles &&
      s.account.roles.find(role => role.name === 'system_admin')
    ) of(true);

    // else start loading the roles etc...
    return this.activeAccountService.isSystemAdmin().pipe(
      tap(bool => {
        if (bool === false) this.router.navigate(['/access-denied']);
      })
    );
  }

}
