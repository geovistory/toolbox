import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { InfLanguage, LanguagesService, ProjectConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CtrlLanguageComponent } from '../../../components/editor/ctrl-language/ctrl-language.component';
import { GvAuthService } from '../../../services/auth.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';


class ProjectLabelDescription {
  'label': string;
  'language': InfLanguage;
  'text_property': string;
}

@Component({
  selector: 'gv-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink, MatCardModule, MatIconModule, FormsModule, NgClass, NgIf, NgFor, CtrlLanguageComponent, MatButtonModule]
})
export class ProjectCreateComponent implements OnInit {
  createBtnDisabled = false;
  errorMessages: any;
  model: ProjectLabelDescription = new ProjectLabelDescription();

  // Language search
  public languageSearch: any;
  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectApi: ProjectConfigurationService,
    private languageApi: LanguagesService,
    private authService: GvAuthService,
    private state: StateFacade
  ) {

  }

  ngOnInit() {
    this.state.ui.loadingBar.addJob()
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
          this.state.ui.loadingBar.removeJob()
        },
        error => {
          this.state.ui.loadingBar.removeJob()
        },
      );
  }


  request() {
    this.state.ui.loadingBar.addJob()
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
          this.state.ui.loadingBar.removeJob()
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.error.details.messages;
          this.createBtnDisabled = false;
          this.state.ui.loadingBar.removeJob()
        },
      );
  }



}
