import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { ActiveAccountService } from './active-account.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private activeAccountService: ActiveAccountService,
    private router: Router
){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if(this.activeAccountService.isLoggedIn()){ return true };

    // Store the attempted URL for redirecting
    this.activeAccountService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }


}