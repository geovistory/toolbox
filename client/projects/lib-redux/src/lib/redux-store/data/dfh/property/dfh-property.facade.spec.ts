import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DfhProperty } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { IAppState } from '../../../state.model';
import { dataFeatureKey } from '../../data.feature.key';
import { DfhPropertyFacade } from './dfh-property.facade';
import { dfhPropertyReducers } from './dfh-property.reducer';

describe('DfhProperty Facade', () => {
  let facade: DfhPropertyFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dfh: dfhPropertyReducers })),
      ],
      providers: [DfhPropertyFacade]
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

    facade = TestBed.inject(DfhPropertyFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.dfhProperty$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: DfhProperty = { pk_property: 11, parent_properties: [2], ancestor_properties: [], has_domain: 22, has_range: 33, };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getDfhProperty.byPropDomainRange(11, 22, 33))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getDfhProperty.byHasTypeSubproperty(true))
    expect(res2).toEqual({ '11_22_33': a })
    const res3 = await firstValueFrom(facade.getDfhProperty.byDomain(22))
    expect(res3).toEqual({ '11_22_33': a })
    const res4 = await firstValueFrom(facade.getDfhProperty.byRange(33))
    expect(res4).toEqual({ '11_22_33': a })
  });

})
