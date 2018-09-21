import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectDetail, DfhClass } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ClassSettings } from './api/class-settings.models';
import { ClassSettingsAPIEpics } from './api/class-settings.epics';
import { classSettingsReducer } from './api/class-settings.reducer';
import { ActivatedRoute } from '@angular/router';
import { ClassSettingsAPIActions } from './api/class-settings.actions';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classSettingsReducer
})
@Component({
  selector: 'gv-class-settings',
  templateUrl: './class-settings.component.html',
  styleUrls: ['./class-settings.component.css']
})
export class ClassSettingsComponent extends ClassSettingsAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ClassSettings>;

  // path to the substore
  basePath = ['activeProject', 'classSettings'];

  // select observables of substore properties
  @select() dfhClass$: Observable<DfhClass>;

  // class
  class: DfhClass;
  classLabel: string;

  // active project
  project: ProjectDetail;
  projectLabel: string;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ClassSettingsAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();

    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.localStore = this.ngRedux.configureSubStore(this.basePath, classSettingsReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load(id);

    this.dfhClass$.takeUntil(this.destroy$).subscribe(c => {
      if (c) this.classLabel = c.dfh_standard_label
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
