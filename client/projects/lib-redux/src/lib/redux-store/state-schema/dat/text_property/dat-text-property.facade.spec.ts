import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DatState } from "../dat.models";
import { DatTextPropertyFacade } from './dat-text-property.facade';
import { datTextPropertyReducers } from './dat-text-property.reducer';

describe('DatTextProperty Facade', () => {
  let facade: DatTextPropertyFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dat: datTextPropertyReducers })),
      ],
      providers: [DatTextPropertyFacade]
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

    facade = TestBed.inject(DatTextPropertyFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item', async () => {
    const a: DatTextProperty = { pk_entity: 11, fk_entity: 22, fk_system_type: 33, fk_language: 44 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getTextProperty.byPkEntity$(11))
    expect(res).toEqual(a)
    const s = await firstValueFrom(store.select(s => s));
    const res2 = await firstValueFrom(facade.getTextProperty.byFkEntityAndSysType$(22, 33))
    expect(res2).toEqual({ '11': a })
  });

})
