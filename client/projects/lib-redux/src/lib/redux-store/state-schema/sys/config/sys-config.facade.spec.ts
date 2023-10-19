import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { SysState } from "../sys.models";
import { SysConfigFacade } from './sys-config.facade';
import { sysConfigReducers } from './sys-config.reducer';

describe('SysConfig Facade', () => {
  let facade: SysConfigFacade;
  let store: Store<SysState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ sys: sysConfigReducers })),
      ],
      providers: [SysConfigFacade]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(SysConfigFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.sysConfig$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: SysConfigValue = { classes: {}, specialFields: {} };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.sysConfig$)
    expect(res).toEqual(a)
  });

})
