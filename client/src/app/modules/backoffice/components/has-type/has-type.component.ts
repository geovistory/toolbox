import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { HasType } from './api/has-type.models';
import { HasTypePropertyReadable } from "../../../../core/state/models/has-type-property-readable";
import { HasTypeAPIEpics } from './api/has-type.epics';
import { HasTypeAPIActions } from './api/has-type.actions';
import { hasTypeReducer } from './api/has-type.reducer';
import { MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: hasTypeReducer
})
@Component({
  selector: 'gv-has-type',
  templateUrl: './has-type.component.html',
  styleUrls: ['./has-type.component.css']
})
export class HasTypeComponent extends HasTypeAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<HasType>;

  // path to the substore
  basePath = ['backoffice', 'hasType'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<HasTypePropertyReadable[]>;

  displayedColumns: string[] = ['pk_typed_class', 'typed_class_label', 'dfh_pk_property', 'property_label', 'pk_type_class', 'type_class_label'];
  dataSource = new MatTableDataSource([]);

  constructor(
    protected rootEpics: RootEpics,
    private epics: HasTypeAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, hasTypeReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.load();

    this.items$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
