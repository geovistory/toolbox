import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Warehouse } from './api/warehouse.models';
import { WarehouseAPIEpics } from './api/warehouse.epics';
import { WarehouseAPIActions } from './api/warehouse.actions';
import { warehouseReducer } from './api/warehouse.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: warehouseReducer
})
@Component({
  selector: 'gv-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends WarehouseAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Warehouse>;

  // path to the substore
  basePath = ['backoffice', 'warehouse'];

  // select observables of substore properties
  @select() createEntityPreviewsLoading$: Observable<boolean>;
  @select() createEntityPreviewsInfo$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: WarehouseAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, warehouseReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
