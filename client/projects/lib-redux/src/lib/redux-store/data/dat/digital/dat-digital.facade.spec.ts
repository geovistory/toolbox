import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DatState } from "../dat.models";
import { DatDigitalFacade } from './dat-digital.facade';
import { datDigitalReducers } from './dat-digital.reducer';

describe('DatDigital Facade', () => {
  let facade: DatDigitalFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dat: combineReducers({ digital: datDigitalReducers }) }))
      ],
      providers: [DatDigitalFacade]
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

    facade = TestBed.inject(DatDigitalFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityVersionIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item', async () => {
    const a: DatDigital = { pk_entity: 11, entity_version: 22, pk_text: 33 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getDigital.byPkEntityVersion$(11, 22))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getDigital.byPkEntity$(11))
    expect(res2).toEqual({ '11_22': a })
    const res3 = await firstValueFrom(facade.getDigital.byPkText$(33))
    expect(res3).toEqual({ '11_22': a })
  });

})
