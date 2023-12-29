import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { AccountService, ProProject } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../../../components/misc/navbar/navbar.component';
import { ProjectCardComponent } from '../../../components/misc/project-card/project-card.component';


@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgIf, MatButtonModule, NgFor, ProjectCardComponent, AsyncPipe]
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
