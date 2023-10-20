import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProConfig } from '@kleiolab/lib-config';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { ActiveAccountPipes } from 'projects/lib-queries/src/lib/queries/services/active-account-pipes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() project: ProProject

  PK_PROJECT_OF_TEMPLATE_PROJECT = ProConfig.PK_PROJECT_OF_TEMPLATE_PROJECT
  PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT = ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
  PK_PROJECT_OF_SANDBOX_PROJECT = ProConfig.PK_PROJECT_OF_SANDBOX_PROJECT

  projectLanugageLabel$: Observable<string>
  projectLabel$: Observable<string>
  projectDescription$: Observable<string>
  btn1Label$: Observable<string>
  btn1Url$: Observable<string>
  btn2Label$: Observable<string>
  btn2Url$: Observable<string>

  constructor(private p: ActiveAccountPipes) {
  }

  ngOnInit(): void {
    this.projectLanugageLabel$ = this.p.getProjectLanguageLabel(this.project); // inf.lang getLangLabel
    this.projectLabel$ = this.p.getProjectLabel(this.project.pk_entity); // pro.project
    this.projectDescription$ = this.p.getProjectDescription(this.project.pk_entity);
    this.btn1Label$ = this.p.getProjectBtn1Label(this.project.pk_entity);
    this.btn1Url$ = this.p.getProjectBtn1Url(this.project.pk_entity);
    this.btn2Label$ = this.p.getProjectBtn2Label(this.project.pk_entity);
    this.btn2Url$ = this.p.getProjectBtn2Url(this.project.pk_entity);
  }

}
