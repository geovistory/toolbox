import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Repros } from './api/repros.models';
import { ReprosAPIEpics } from './api/repros.epics';
import { ReprosAPIActions } from './api/repros.actions';
import { reprosReducer } from './api/repros.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: reprosReducer
})
@Component({
  selector: 'gv-repros',
  templateUrl: './repros.component.html',
  styleUrls: ['./repros.component.css']
})
export class ReprosComponent extends ReprosAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Repros>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() showText$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ReprosAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, reprosReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.init()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
