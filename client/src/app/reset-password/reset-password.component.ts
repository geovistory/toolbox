import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Http, Request, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import {ErrorHandler} from './../shared/sdk/services/core/error.service';
import { BaseLoopBackApi } from './../shared/sdk/services/core/base.service';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import {UserApi} from './../shared/sdk/services/custom/User';

@Component({
  selector: 'gv-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  confirm:boolean = false; //if true, form is hidden and confirmation shown.
  returnUrl: string;
  access_token: string;
  errorMessage: string;

  constructor(
    @Inject(Http) protected http: Http,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  ngOnInit() {
    this.access_token = this.route.snapshot.queryParams['access_token'] || '';
  }
  
  setPassword(newPassword: string): Observable<any> {

    let headers: Headers = new Headers();
    headers.append("Authorization", this.access_token)
    headers.append("Content-Type","application/x-www-form-urlencoded")

    let method: string = "POST";

    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Users/reset-password";

    let urlSearchParams = new URLSearchParams();
    if (typeof newPassword !== 'undefined' && newPassword !== null) {
      urlSearchParams.append('newPassword', newPassword);
    }

    let body:string = urlSearchParams.toString()

    let request: Request = new Request(
      new RequestOptions({
        headers : headers,
        method  : method,
        url     : url,
        body    : body
      })
    );

    return this.http.request(request)
    .map((res: any) => (res.text() != "" ? res.json() : {}))
    .catch((e) => this.errorHandler.handleError(e));
  }


  resetPassword(){
    this.loading = true;
    this.errorMessage = '';
    this.setPassword(this.model.password)
    .subscribe(
      data => {
        this.loading = false;
        this.confirm = true;
      },
      error => {
        // TODO: error handling for statusCode: 500; ENOTFOUND;
        // When (db) server not available; e.g. «Network error»

        this.errorMessage = error.message;
        this.loading = false;
      });
    }

  }
