import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState, ProjectDetail, ActiveProjectService } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gv-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();

  project: ProjectDetail;
  projectLabel: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private activeProjectService: ActiveProjectService,
    activatedRoute: ActivatedRoute,
  ) {
    const id = activatedRoute.snapshot.parent.params['id'];
    this.activeProjectService.initProject(id);
    this.activeProjectService.initProjectCrm(id);
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
