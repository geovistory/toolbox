import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, IAppState, ProjectDetail } from 'app/core';
import { Subject } from 'rxjs';

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
    public p: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)

    const id = activatedRoute.snapshot.params['pkActiveProject'];

    this.p.initProject(id);
    this.p.initProjectCrm(id);
  }

  ngOnDestroy(): void {
    this.p.closeProject();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
