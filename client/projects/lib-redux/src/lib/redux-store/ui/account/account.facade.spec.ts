import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { IAppState } from '../../state.model';
import { AccountActions } from './account.actions';
import { AccountFacade } from './account.facade';
import { AccountModule } from './account.module';

describe('Account Facade', () => {
  let facade: AccountFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        AccountModule,
        HttpClientModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(AccountFacade);
    store = TestBed.inject(Store);
  });

  it('should init account with undefined', async () => {
    const res = await firstValueFrom(facade.account$)
    expect(res).toBe(undefined)
  });

  it('should init roles with []', async () => {
    const res = await firstValueFrom(facade.roles$)
    expect(res).toEqual([])
  });


  it('should reduce and select account', async () => {
    facade.loginSucceeded({ email: 'A' })
    const account = await firstValueFrom(facade.account$)
    expect(account.email).toEqual('A')
  });

  it('should reduce and select account roles', async () => {
    store.dispatch(AccountActions.loadRolesSucceeded([{ name: 'owner' }]))
    const roles = await firstValueFrom(facade.roles$)
    expect(roles).toEqual([{ name: 'owner' }])
  });


})
