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
import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';
import { KeysPipe } from 'app/shared/pipes/keys.pipe';
import { takeUntil, first } from 'rxjs/operators';
import { Columns } from 'ngx-easy-table/src/app/ngx-easy-table/model/columns';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: propertyListReducer
})
@Component({
  selector: 'gv-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  providers: [KeysPipe]
})
export class PropertyListComponent extends PropertyListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<PropertyList>;

  // path to the substore
  basePath = ['admin', 'propertiesList'];

  // select observables of substore properties
  @select() items$: Observable<{ [key: string]: DfhProperty }>;


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
    { key: 'dfh_has_domain', title: 'Domain pk' },
    { key: 'domain_standard_label', title: 'Domain' },
    { key: 'dfh_pk_property', title: 'Property pk' },
    { key: 'property_standard_label', title: 'Property' },
    { key: 'dfh_has_range', title: 'Range pk' },
    { key: 'range_standard_label', title: 'Range' },
    { key: 'dfh_domain_instances_max_quantifier', title: 'dmax' },
    { key: 'dfh_domain_instances_min_quantifier', title: 'dmin' },
    { key: 'dfh_range_instances_max_quantifier', title: 'rmax' },
    { key: 'dfh_range_instances_min_quantifier', title: 'rmin' },
    { key: 'gui_label_sg', title: 'gui label sg', searchEnabled: false, orderEnabled: false },
    { key: 'gui_label_pl', title: 'gui label pl', searchEnabled: false, orderEnabled: false },
    { key: 'gui_label_sg_inv', title: 'gui label sg inv', searchEnabled: false, orderEnabled: false },
    { key: 'gui_label_pl_inv', title: 'gui label pl inv', searchEnabled: false, orderEnabled: false },
    { key: 'identity_defining', title: 'Identity Defining', searchEnabled: false, orderEnabled: false },
    { key: 'profiles', title: 'Profiles' },
    { key: 'removed_from_profiles', title: 'Removed from profiles' },
  ];
  columnsCopy;

  checked = new Set([
    // 'dfh_has_domain',
    'domain_standard_label',
    // 'dfh_pk_property',
    'property_standard_label',
    // 'dfh_has_range',
    'range_standard_label',
    // 'dfh_domain_instances_max_quantifier',
    // 'dfh_domain_instances_min_quantifier',
    // 'dfh_range_instances_max_quantifier',
    // 'dfh_range_instances_min_quantifier',
    // 'gui_label_sg',
    // 'gui_label_pl',
    // 'gui_label_sg_inv',
    // 'gui_label_pl_inv',
    // 'identity_defining',
    // 'profiles',
    // 'removed_from_profiles',
  ]);


  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: PropertyListAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    private keys: KeysPipe
  ) {
    super()
    this.items$.pipe(
      first(items => this.keys.transform(items).length > 0),
      takeUntil(this.destroy$)
    ).subscribe(items => { this.setTableData(items) });

    this.columnsCopy = this.columns;
    this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));

  }

  quantifierToText(q): string {
    if (q == -1) return 'n';
    else if (q == undefined) return 'NULL';
    else return q;
  }

  setTableData(items: { [key: string]: DfhProperty }) {
    this.data = this.keys.transform(items).map((item) => {
      const domainClass = (item.value.domain_class || {} as any);
      const rangeClass = (item.value.range_class || {} as any);
      return {
        ...item.value,
        dfh_domain_instances_max_quantifier: this.quantifierToText(item.value.dfh_domain_instances_max_quantifier),
        dfh_domain_instances_min_quantifier: this.quantifierToText(item.value.dfh_domain_instances_min_quantifier),
        dfh_range_instances_max_quantifier: this.quantifierToText(item.value.dfh_range_instances_max_quantifier),
        dfh_range_instances_min_quantifier: this.quantifierToText(item.value.dfh_range_instances_min_quantifier),
        domain_standard_label: [domainClass.dfh_identifier_in_namespace, domainClass.dfh_standard_label].join(' '),
        property_standard_label: [item.value.dfh_identifier_in_namespace, item.value.dfh_standard_label].join(' '),
        range_standard_label: [rangeClass.dfh_identifier_in_namespace, rangeClass.dfh_standard_label].join(' '),
        key: item.key,
        profiles: item.value.property_profile_view.filter(p => p.removed_from_api === false).map(p => p.dfh_profile_label).join('; '),
        removed_from_profiles: item.value.property_profile_view.filter(p => p.removed_from_api).map(p => p.dfh_profile_label).join('; ')
      }
    })
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

  changeIdentityDefining(row) {
    this.updateProperty(new DfhProperty({
      ...row,
      identity_defining: row.identity_defining ? false : true
    } as DfhProperty))
  }

  toggle(name: string): void {
    this.checked.has(name) ? this.checked.delete(name) : this.checked.add(name);
    this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));
  }
}
