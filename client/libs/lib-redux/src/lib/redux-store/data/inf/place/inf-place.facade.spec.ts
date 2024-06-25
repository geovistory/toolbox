import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { InfState } from "../inf.models";
import { InfPlaceFacade } from './inf-place.facade';
import { infPlaceReducers } from './inf-place.reducer';

describe('InfPlace Facade', () => {
  let facade: InfPlaceFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ inf: combineReducers({ place: infPlaceReducers }) }))
      ],
      providers: [InfPlaceFacade]
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

    facade = TestBed.inject(InfPlaceFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.placesByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const input: InfPlace = { fk_class: 1, pk_entity: 11, lat: 1, long: 2 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getPlace.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
