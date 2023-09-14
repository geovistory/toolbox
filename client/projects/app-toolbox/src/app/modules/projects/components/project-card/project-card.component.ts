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

  projectLanugageLabel$: Observable<String>
  projectLabel$: Observable<String>
  projectDescription$: Observable<String>

  constructor(private p: ActiveAccountPipes) {
  }

  ngOnInit(): void {
    this.projectLanugageLabel$ = this.p.getProjectLanguageLabel(this.project);
    this.projectLabel$ = this.p.getProjectLabel(this.project);
    this.projectDescription$ = this.p.getProjectDescription(this.project);
  }

}
