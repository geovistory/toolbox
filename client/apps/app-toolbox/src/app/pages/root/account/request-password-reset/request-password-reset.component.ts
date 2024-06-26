import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { AccountService } from '@kleiolab/lib-sdk-lb4';
import { first } from 'rxjs/operators';
import { NavbarComponent } from '../../../../components/layout/navbar/navbar.component';




@Component({
  selector: 'gv-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgIf, FormsModule, NgClass, MatButtonModule]
})
export class RequestPasswordResetComponent {

  model: any = {};
  loading = false;
  errorMessage: string;
  confirm = false; // if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountService,
    private state: StateFacade,
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
