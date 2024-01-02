import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { first } from 'rxjs/operators';
import { NavbarComponent } from '../../../../components/layout/navbar/navbar.component';
import { ActiveAccountService } from '../../../../services/active-account.service';


@Component({
  selector: 'gv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, NgClass, NgIf, MatButtonModule]
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
