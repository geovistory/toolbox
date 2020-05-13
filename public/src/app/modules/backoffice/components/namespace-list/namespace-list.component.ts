import { Component, OnDestroy, Input, OnInit, HostBinding } from '@angular/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { NamespaceList } from './api/namespace-list.models';
import { NamespaceListAPIEpics } from './api/namespace-list.epics';
import { NamespaceListAPIActions } from './api/namespace-list.actions';
import { namespaceListReducer } from './api/namespace-list.reducer';
import { DatNamespace } from 'app/core/sdk';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: namespaceListReducer
})
@Component({
  selector: 'gv-namespace-list',
  templateUrl: './namespace-list.component.html',
  styleUrls: ['./namespace-list.component.css']
})
export class NamespaceListComponent extends NamespaceListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @HostBinding('class.gv-scroll-y-auto') scY = true;


  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<NamespaceList>;

  // path to the substore
  basePath = ['backoffice', 'namespacesList'];

  // select observables of substore properties
  @select() namespaces$: Observable<DatNamespace[]>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: NamespaceListAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, namespaceListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
