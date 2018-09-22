import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, DfhClass, ProjectDetail } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Types } from './api/types.models';
import { TypesAPIEpics } from './api/types.epics';
import { TypesAPIActions } from './api/types.actions';
import { typesReducer } from './api/types.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typesReducer
})
@Component({
  selector: 'gv-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent extends TypesAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Types>;

  // path to the substore
  basePath: ['activeProject', 'classSettings', 'types'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  //  class
  class: DfhClass;
  classLabel: string;

  // type class
  typeClass: DfhClass;
  typeClassLabel: string;

  // active project
  project: ProjectDetail;
  projectLabel: string;


  constructor(
    protected rootEpics: RootEpics,
    private epics: TypesAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super();

    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
    this.ngRedux.select<DfhClass>(['activeProject', 'classSettings', 'class']).takeUntil(this.destroy$).subscribe(c => {
      this.class = c;
      this.classLabel = c.dfh_standard_label;
    })

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
