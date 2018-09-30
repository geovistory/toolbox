import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { PropertyList } from './api/property-list.models';
import { PropertyListAPIEpics } from './api/property-list.epics';
import { PropertyListAPIActions } from './api/property-list.actions';
import { propertyListReducer } from './api/property-list.reducer';
import { DfhProperty } from '../../../../core/sdk/models/DfhProperty';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: propertyListReducer
})
@Component({
  selector: 'gv-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent extends PropertyListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<PropertyList>;

  // path to the substore
  basePath = ['admin', 'propertysList'];

  // select observables of substore properties
  @select() propertys$: Observable<DfhProperty[]>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: PropertyListAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, propertyListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
