import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy } from '@angular/core';
import { IAppState, ProjectDetail } from 'app/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'gv-project-settings-collaborators',
  templateUrl: './project-settings-collaborators.component.html',
  styleUrls: ['./project-settings-collaborators.component.scss']
})
export class ProjectSettingsCollaboratorsComponent implements OnDestroy {

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
    this.destroy$.unsubscribe()
  }

}
