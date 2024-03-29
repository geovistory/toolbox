import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarActions } from '@kleiolab/lib-redux';
import { InfLanguage, LanguagesService, ProjectConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { GvAuthService } from 'projects/app-toolbox/src/app/core/auth/auth.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


class ProjectLabelDescription {
  'label': string;
  'language': InfLanguage;
  'text_property': string;
}

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
    private projectApi: ProjectConfigurationService,
    private languageApi: LanguagesService,
    private authService: GvAuthService,
    private loadingBarActions: LoadingBarActions,
  ) {

  }

  ngOnInit() {
    this.loadingBarActions.addJob()
    const userLang = navigator.language.split('-')[0].split('_')[0];

    this.languageApi.findLanguagesControllerFind({ 'where': { 'iso6391': userLang } })
      .pipe(first())
      .subscribe(
        (data: any) => {

          try {
            this.model.language = data[0];
          } catch (e) {
            // TODO error handling
          }
          this.loadingBarActions.removeJob()
        },
        error => {
          this.loadingBarActions.removeJob()
        },
      );
  }


  request() {
    this.loadingBarActions.addJob()
    this.createBtnDisabled = true;

    this.errorMessages = {};

    this.projectApi.createProjectConfigControllerCreateProject(
      this.authService.getCurrentUserId(),
      this.model.language.pk_entity,
      this.model.label,
      (this.model.text_property ? this.model.text_property : null)
    )
      .pipe(first())
      .subscribe(
        data => {
          this.createBtnDisabled = false;
          this.router.navigate(['../'], { relativeTo: this.activatedRoute })
          this.loadingBarActions.removeJob()
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.error.details.messages;
          this.createBtnDisabled = false;
          this.loadingBarActions.removeJob()
        },
      );
  }



}
