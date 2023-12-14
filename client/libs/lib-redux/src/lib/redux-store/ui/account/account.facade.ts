import { Injectable } from '@angular/core'
import { PubAccount } from '@kleiolab/lib-sdk-lb4'
import { Store } from '@ngrx/store'
import { AccountActions } from './account.actions'
import { AccountState } from './account.model'
import { getAccount, getAccountRoles } from './account.selectors'

@Injectable({
  providedIn: 'root'
})
export class AccountFacade {

  account$ = this.store.select(getAccount)
  roles$ = this.store.select(getAccountRoles)

  constructor(private store: Store<AccountState>) { }

  loginSucceeded = (account: PubAccount) => this.store.dispatch(AccountActions.loginSucceeded(account))

  loadRoles = (accountId: number, cb?: () => any) => this.store.dispatch(AccountActions.loadRoles(accountId, cb))

}
