import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState, RootEpics } from '@kleiolab/lib-redux';
import { SubstoreComponent } from 'projects/app-toolbox/src/app/core/basic/basic.module';
import { KeysPipe } from 'projects/app-toolbox/src/app/shared/pipes/keys.pipe';
import { values } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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

  value$: Observable<Account[]>


  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: AccountListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private keys: KeysPipe
  ) {
    super()
    this.value$ = this.items$.pipe(map(x => values(x)))
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
