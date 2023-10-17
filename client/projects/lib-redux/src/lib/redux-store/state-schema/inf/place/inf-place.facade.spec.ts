import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { infFeatureKey } from "../inf.feature.key";
import { InfState } from "../inf.models";
import { InfPlaceFacade } from './inf-place.facade';
import { infPlaceReducers } from './inf-place.reducer';

fdescribe('InfPlace Facade', () => {
  let facade: InfPlaceFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(infFeatureKey, infPlaceReducers),
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

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.placesByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const input: InfPlace = { fk_class: 1, pk_entity: 11, lat: 1, long: 2 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getPlace.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
