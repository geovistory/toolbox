import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {LoopBackAuth} from './../shared/sdk/services/core/auth.service';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import {UserApi} from './../shared/sdk/services/custom/User';

@Component({
  selector: 'gv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoopBackAuth,
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard';
  }

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.userApi.login(this.model)
    .subscribe(
      data => {
        // if (data.user) {
        //   // store user details
        //   this.sharedDataService.currentUser = data.user;
        // }
        this.loading = false;

        this.router.navigate([this.returnUrl]);
      },
      error => {
        // TODO: error handling for statusCode: 500; ENOTFOUND;
        // When (db) server not available; e.g. «Network error»

        this.errorMessage = error.message;
        this.loading = false;
      });
    }

  }
