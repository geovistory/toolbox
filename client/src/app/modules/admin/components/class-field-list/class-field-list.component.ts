import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ComPropertySet } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ClassFieldList } from './api/class-field-list.models';
import { ClassFieldListAPIEpics } from './api/class-field-list.epics';
import { ClassFieldListAPIActions } from './api/class-field-list.actions';
import { classFieldListReducer } from './api/class-field-list.reducer';
import { Config, Columns } from 'ngx-easy-table/src/app/ngx-easy-table';
import { KeysPipe } from 'app/shared/pipes/keys.pipe';
import { first, takeUntil } from 'rxjs/operators';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classFieldListReducer
})
@Component({
  selector: 'gv-class-field-list',
  templateUrl: './class-field-list.component.html',
  styleUrls: ['./class-field-list.component.css'],
  providers: [KeysPipe]
})
export class ClassFieldListComponent extends ClassFieldListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ClassFieldList>;

  // path to the substore
  basePath = ['admin', 'classFieldList'];

  // select observables of substore properties
  @select() items$: Observable<{ [key: string]: ComPropertySet }>;

  tableConfiguration: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: true,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    tableLayout: {
      style: 'normal', // or big or tiny
      theme: 'normal', // or dark
      borderless: false,
      hover: true,
      striped: true,
    }
  };

  columns: Columns[] = [
    { key: 'pk_entity', title: 'pk_entity' },
    { key: 'label', title: 'Standard label' },
    { key: 'description', title: 'Standard description' },
    { key: 'properties', title: 'Stands for Properties' }
  ];

  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: ClassFieldListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private keys: KeysPipe
  ) {
    super()
    this.items$.pipe(
      first(items => this.keys.transform(items).length > 0),
      takeUntil(this.destroy$)
    ).subscribe(items => { this.setTableData(items) });
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, classFieldListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setTableData(items: { [key: string]: ComPropertySet }) {
    this.data = this.keys.transform(items).map((item) => {
      return {
        ...item.value,
        properties: !item.value.property_set_property_rel ? '' : item.value.property_set_property_rel.map((prel) => (prel.property.dfh_identifier_in_namespace)).join(', '),
        key: item.key
      }
    })
  }
}
