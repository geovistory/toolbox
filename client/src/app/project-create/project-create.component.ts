import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { LoopBackConfig } from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import { Project } from './../shared/sdk/models/Project';
import { Language } from '../shared/sdk/models/Language';
import { LanguageApi } from '../shared/sdk/services/custom/Language';
import { AccountApi } from '../shared/sdk/services/custom/Account';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';



@Component({
  selector: 'gv-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  loading: boolean = false;
  errorMessages: any;
  model = new Project();

  //Language search
  public language: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountApi: AccountApi,
    private languageApi: LanguageApi,
    private authService: LoopBackAuth,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  ngOnInit(){
    const userLang = navigator.language.split("-")[0].split("_")[0];
    this.languageApi.find({"where":{"part1":userLang}})
    .subscribe(
      (data:any) => {
        try {
          this.model.default_language = new Language(data[0]);
        }
        catch (e) {
          //TODO error handling
        }
      },
      error => {
      }
    );
  }


  request() {
    this.loading = true;
    this.errorMessages = {};
    this.accountApi.createProjects(this.authService.getCurrentUserId(), this.model)
    .subscribe(
      data => {
        this.loading = false;
        this.router.navigate(['../projects'], {relativeTo: this.activatedRoute})
      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
      }
    );
  }


  search = (text$: Observable<string>) =>
  text$
  .debounceTime(300)
  .distinctUntilChanged()
  .do(() => this.searching = true)
  .switchMap(term =>
    this.languageApi.queryByString(term)
    .do(() => this.searchFailed = false)
    .catch(() => {
      this.searchFailed = true;
      return Observable.of([]);
    }))
    .do(() => this.searching = false)
    .merge(this.hideSearchingWhenUnsubscribed);

    formatter = (x) => x.ref_name;

  }
