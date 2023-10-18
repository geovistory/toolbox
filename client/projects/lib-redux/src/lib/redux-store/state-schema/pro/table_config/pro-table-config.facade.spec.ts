import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProTableConfig } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { proFeatureKey } from "../pro.feature.key";
import { ProState } from "../pro.models";
import { ProTableConfigFacade } from './pro-table-config.facade';
import { proTableConfigReducers } from './pro-table-config.reducer';

fdescribe('ProTableConfig Facade', () => {
  let facade: ProTableConfigFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(proFeatureKey, proTableConfigReducers),
      ],
      providers: [ProTableConfigFacade]
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

    facade = TestBed.inject(ProTableConfigFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: ProTableConfig = { pk_entity: 11, fk_digital: 123, config: {} };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getTableConfig.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getTableConfig.byFkDigital$(123))
    expect(res2).toEqual({ 11: a })

  });

})
