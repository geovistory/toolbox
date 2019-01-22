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
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
