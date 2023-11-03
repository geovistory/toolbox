import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { ActiveAccountService } from '../../../../core/active-account';
import { first } from 'rxjs/operators';


@Component({
  selector: 'gv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: {
    email?: string,
    password?: string
  } = {};

  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private activeAccountService: ActiveAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateFacade,
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard';
  }

  login() {
    this.startLoading();
    this.errorMessage = '';

    const { email, password } = this.model
    if (email && password) {
      this.activeAccountService.login({ email, password })
        .pipe(first())
        .subscribe(
          result => {
            const redirect = this.activeAccountService.redirectUrl ? this.activeAccountService.redirectUrl : this.returnUrl;
            this.router.navigate([redirect]);
            this.completeLoading()
          },
          error => {
            // TODO: error handling for statusCode: 500; ENOTFOUND;
            // When (db) server not available; e.g. «Network error»
            if (error && error.error && error.error.error && error.error.error.message) {
              this.errorMessage = error.error.error.message
            }
            else {
              this.errorMessage = 'Login not possible.';
            }
            this.completeLoading()
          },

        )
    }

  }

  startLoading() {
    this.state.ui.loadingBar.addJob()
    this.loading = true;
  }

  stopLoading() {
    this.state.ui.loadingBar.removeJob()
  }

  completeLoading() {
    this.loading = false;
    this.state.ui.loadingBar.removeJob()
  }
}
