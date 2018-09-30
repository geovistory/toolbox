import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { SystemTypeList } from './api/system-type-list.models';
import { SystemTypeListAPIEpics } from './api/system-type-list.epics';
import { SystemTypeListAPIActions } from './api/system-type-list.actions';
import { systemtypeListReducer } from './api/system-type-list.reducer';
import { ComSystemType } from 'app/core/sdk/models/ComSystemType';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: systemtypeListReducer
})
@Component({
  selector: 'gv-system-type-list',
  templateUrl: './system-type-list.component.html',
  styleUrls: ['./system-type-list.component.css']
})
export class SystemTypeListComponent extends SystemTypeListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<SystemTypeList>;

  // path to the substore
  basePath = ['admin', 'systemtypesList'];

  // select observables of substore properties
  @select() systemtypes$: Observable<ComSystemType[]>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SystemTypeListAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, systemtypeListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
