import { Component } from '@angular/core';
import { LoadingBarActions } from '@kleiolab/lib-redux';
import { AccountService } from '@kleiolab/lib-sdk-lb4';
import { first } from 'rxjs/operators';




@Component({
  selector: 'gv-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {

  model: any = {};
  loading = false;
  errorMessage: string;
  confirm = false; // if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountService,
    private loadingBarActions: LoadingBarActions,
  ) { }

  request() {
    this.startLoading();

    this.errorMessage = '';

    this.accountApi.accountControllerForgotPassword(this.model.email)
      .pipe(first())
      .subscribe(
        data => {
          this.confirm = true;
          this.completeLoading()

        },
        error => {

          if (error && error.error && error.error.error && error.error.error.message) {
            this.errorMessage = error.error.error.message
          }
          else {
            this.errorMessage = 'Could not send email to reset password.';
          }
          this.stopLoading()

        },

      );
  }

  startLoading() {
    this.loadingBarActions.addJob()
    this.loading = true;
  }

  stopLoading() {
    this.loadingBarActions.removeJob()
  }

  completeLoading() {
    this.loading = false;
    this.loadingBarActions.removeJob()
  }
}
