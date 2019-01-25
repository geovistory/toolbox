import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoopBackAuth, LoopBackConfig, ComProjectApi, PubAccountApi, ComLanguage, ComLanguageApi } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs';


export class ProjectLabelDescription {
  'label': String;
  'language': ComLanguage;
  'text_property': String;
  test: any; // TODO REMOVE
};

@Component({
  selector: 'gv-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  createBtnDisabled = false;
  errorMessages: any;
  model: ProjectLabelDescription = new ProjectLabelDescription();

  // Language search
  public languageSearch: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountApi: PubAccountApi,
    private projectApi: ComProjectApi,
    private languageApi: ComLanguageApi,
    private authService: LoopBackAuth,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  ngOnInit() {
    this.startLoading();
    const userLang = navigator.language.split('-')[0].split('_')[0];
    this.languageApi.find({ 'where': { 'iso6391': userLang } })
      .subscribe(
        (data: any) => {
          this.completeLoading();

          try {
            this.model.language = data[0];
          } catch (e) {
            // TODO error handling
          }
        },
        error => {
        }
      );
  }


  request() {
    this.startLoading();
    this.createBtnDisabled = true;

    this.errorMessages = {};

    this.projectApi.createWithLabelAndDescription(
      this.authService.getCurrentUserId(),
      this.model.language.pk_language,
      this.model.label,
      (this.model.text_property ? this.model.text_property : null)
    ).subscribe(
      data => {
        this.completeLoading();
        this.createBtnDisabled = false;
        this.router.navigate(['../'], { relativeTo: this.activatedRoute })
      },
      error => {
        this.resetLoading();

        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.createBtnDisabled = false;
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

  formatter = (x) => x.notes;


  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }
}
