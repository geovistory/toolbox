import { Component, Inject, OnInit, Optional } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountApi, ErrorHandler, LoopBackConfig } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpHeaders } from '../../../../../../node_modules/@angular/common/http';



@Component({
  selector: 'gv-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  confirm: boolean = false; //if true, form is hidden and confirmation shown.
  returnUrl: string;
  access_token: string;
  errorMessage: string;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private accountApi: AccountApi,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  ngOnInit() {
    this.access_token = this.route.snapshot.queryParams['access_token'] || '';
  }

  setPassword(newPassword: string): Observable<any> {

    let headers = new HttpHeaders();
    headers.append("Authorization", this.access_token)
    headers.append("Content-Type", "application/x-www-form-urlencoded")

    let method: string = "POST";

    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/Accounts/reset-password";

    let urlSearchParams = new URLSearchParams();
    if (typeof newPassword !== 'undefined' && newPassword !== null) {
      urlSearchParams.append('newPassword', newPassword);
    }

    let body: string = urlSearchParams.toString()


    return this.http.request(method, url, {
      body: body,
      headers: headers
    })
      .map((res: any) => (res.text() != "" ? res.json() : {}))
      .catch((e) => this.errorHandler.handleError(e));
  }


  resetPassword() {
    this.startLoading();
    this.errorMessage = '';
    this.setPassword(this.model.password)
      .subscribe(
        data => {
          this.completeLoading();
          this.confirm = true;
        },
        error => {
          // TODO: error handling for statusCode: 500; ENOTFOUND;
          // When (db) server not available; e.g. «Network error»

          this.errorMessage = error.message;
          this.resetLoading();
        });
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
    this.loading = true;
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
    this.loading = false;
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
    this.loading = false;
  }
}
