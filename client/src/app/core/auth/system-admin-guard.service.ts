import { Injectable } from '@angular/core';
import {
  CanActivate, Router, ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ActiveAccountService } from '../active-account/active-account.service';
import { Observable, of } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { tap } from 'rxjs/operators';



@Injectable()
export class SystemAdminGuard implements CanActivate {

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
