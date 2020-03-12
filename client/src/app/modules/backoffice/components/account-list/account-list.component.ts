import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { IAppState } from 'app/core/store/model';
import { KeysPipe } from 'app/shared/pipes/keys.pipe';
import { Columns } from 'ngx-easy-table';
import { Config } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AccountListAPIActions } from './api/account-list.actions';
import { AccountListAPIEpics } from './api/account-list.epics';
import { AccountList, BoAccounts } from './api/account-list.models';
import { accountListReducer } from './api/account-list.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: accountListReducer
})
@Component({
  selector: 'gv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [KeysPipe]
})
export class AccountListComponent extends AccountListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<AccountList>;

  // path to the substore
  basePath = ['backoffice', 'accountList'];

  // select observables of substore properties
  @select() items$: Observable<BoAccounts>;

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
    { key: 'id', title: 'Account ID' },
    { key: 'username', title: 'Username' },
    { key: 'email', title: 'Email' },
    { key: 'emailverified', title: 'Email is verified' },
    { key: 'roles', title: 'Roles', searchEnabled: false, orderEnabled: false },
    { key: 'projectrels', title: 'Projects', searchEnabled: false, orderEnabled: false },
  ];

  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: AccountListAPIEpics,
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
    this.localStore = this.ngRedux.configureSubStore(this.basePath, accountListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load()
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setTableData(items: BoAccounts) {
    this.data = this.keys.transform(items).map((item) => {
      return {
        ...item.value,
        key: item.key
      }
    })
  }

}
