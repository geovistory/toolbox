import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProConfig } from '@kleiolab/lib-config';
import { StateFacade } from '@kleiolab/lib-redux';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'gv-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, NgClass, MatButtonModule, RouterLink, NgIf, AsyncPipe]
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

  constructor(private state: StateFacade) {
  }

  ngOnInit(): void {
    this.projectLanugageLabel$ = this.state.data.getProjectLanguageLabel(this.project.pk_entity);
    this.projectLabel$ = this.state.data.pro.textProperty.getProjectLabel(this.project.pk_entity);
    this.projectDescription$ = this.state.data.pro.textProperty.getProjectDescription(this.project.pk_entity);
    this.btn1Label$ = this.state.data.pro.textProperty.getProjectBtn1Label(this.project.pk_entity);
    this.btn1Url$ = this.state.data.pro.textProperty.getProjectBtn1Url(this.project.pk_entity);
    this.btn2Label$ = this.state.data.pro.textProperty.getProjectBtn2Label(this.project.pk_entity);
    this.btn2Url$ = this.state.data.pro.textProperty.getProjectBtn2Url(this.project.pk_entity);
  }

}
