import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { AccountService, ResetPasswordRequest } from '@kleiolab/lib-sdk-lb4';
import { EqualValidator } from 'apps/app-toolbox/src/app/directives/validation/equal-validator.directive';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { NavbarComponent } from '../../../../components/misc/navbar/navbar.component';




@Component({
  selector: 'gv-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    NgIf,
    FormsModule,
    NgClass,
    EqualValidator,
    MatButtonModule,
  ],
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  confirm = false; // if true, form is hidden and confirmation shown.
  returnUrl: string;
  access_token: string;
  errorMessages: {
    password?: string,
    password2?: string
  };
  undefinedError: boolean;

  constructor(
    protected http: HttpClient,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private state: StateFacade,
  ) {
  }


  ngOnInit() {
    this.access_token = this.route.snapshot.queryParams['access_token'] || '';
  }

  setPassword(newPassword: string): Observable<any> {
    const req: ResetPasswordRequest = {
      password: newPassword,
      resetPasswordToken: this.access_token
    }
    return this.accountApi.accountControllerResetPassword(req)
  }


  resetPassword() {
    this.startLoading();
    this.errorMessages = {};
    this.undefinedError = false;
    this.setPassword(this.model.password)
      .pipe(first())
      .subscribe(
        data => {
          this.confirm = true;
          this.completeLoading()
        },
        errResponse => {
          const error = errResponse.error.error
          if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
            this.errorMessages = { password: error.details[0].message }
          } else {
            this.undefinedError = true;
          }
          this.stopLoading()
        },
      );
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
