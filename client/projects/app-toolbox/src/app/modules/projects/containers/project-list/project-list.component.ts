import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { AccountService, ProProject } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';


@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {


  projects$: Observable<ProProject[]>;
  loadingComplete = false;

  constructor(
    private router: Router,
    private state: StateFacade,
    private accountService: AccountService,
  ) {
    this.projects$ = state.data.pro.project.latestFirst$;
  }

  ngOnInit() {

    this.getProjects();

  }

  getProjects() {
    this.state.data.loadProjectsOfAccount();

    this.accountService.accountControllerWhoAmI().toPromise().catch(
      (error) => {
        if (error.statusCode === 401) {
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: 'projects'
            }
          })
        }
      }
    )
  }
}
