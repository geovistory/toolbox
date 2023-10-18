import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, ProProject } from '@kleiolab/lib-sdk-lb4';
import { ActiveAccountPipes } from 'projects/lib-queries/src/lib/queries/services/active-account-pipes.service';
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/schema/reduxMain.service';
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
    private dataService: ReduxMainService,
    private accountService: AccountService,
    accountPipes: ActiveAccountPipes
  ) {
    this.projects$ = accountPipes.getProjectsLatestFirst();
  }

  ngOnInit() {

    this.getProjects();

  }

  getProjects() {
    this.dataService.loadProjectsOfAccount();

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
