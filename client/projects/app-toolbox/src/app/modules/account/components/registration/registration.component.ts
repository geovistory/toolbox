import { Component } from '@angular/core';
import { LoadingBarActions } from '@kleiolab/lib-redux';
import { AccountService, SignupRequest, SignupValidationError } from '@kleiolab/lib-sdk-lb4';
import { first } from 'rxjs/operators';




@Component({
  selector: 'gv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  model: any = {};
  loading = false;
  errorMessages: {
    password?: string[],
    password2?: string[]
  };
  validationError: SignupValidationError

  confirm = false; // if true, form is hidden and confirmation shown.
  confirmEmail = ''; // email to inform user

  constructor(
    private accountApi: AccountService,
    private loadingBarActions: LoadingBarActions,
  ) { }

  register() {
    this.startLoading();

    this.errorMessages = {};
    const req: SignupRequest = {
      email: this.model.email,
      password: this.model.password,
      username: this.model.username
    }
    this.accountApi.accountControllerSignUp(req)
      .pipe(first())
      .subscribe(
        data => {
          this.validationError = data.validationError;
          if (!this.validationError) { this.confirm = true; this.confirmEmail = data.success.email; };
          this.completeLoading()
        },
        errResponse => {

          const error = errResponse.error.error
          if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
            for (let i = 0; i < error.details.length; i++) {
              const detail = error.details[i];
              if (detail.path === '/password') {
                this.errorMessages['password'] = [...(this.errorMessages['password'] || []), detail.message]
              }
            }
          }
          this.stopLoading()
        }
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
