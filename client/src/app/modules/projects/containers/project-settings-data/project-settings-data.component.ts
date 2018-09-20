import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectDetail } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ProjectSettingsData } from './api/project-settings-data.models';
import { ProjectSettingsDataAPIEpics } from './api/project-settings-data.epics';
import { projectSettingsDataReducer } from './api/project-settings-data.reducer';
import { ProjectSettingsDataAPIActions } from './api/project-settings-data.actions';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: projectSettingsDataReducer
})
@Component({
  selector: 'gv-project-settings-data',
  templateUrl: './project-settings-data.component.html',
  styleUrls: ['./project-settings-data.component.css']
})
export class ProjectSettingsDataComponent extends ProjectSettingsDataAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ProjectSettingsData>;

  // path to the substore
  @Input() basePath = ['activeProject', 'dataSettings'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<any>;

  project: ProjectDetail;
  projectLabel: string;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ProjectSettingsDataAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super();
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, projectSettingsDataReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.load();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
