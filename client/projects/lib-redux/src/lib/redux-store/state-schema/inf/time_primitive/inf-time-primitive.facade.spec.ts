import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { infFeatureKey } from "../inf.feature.key";
import { InfState } from "../inf.models";
import { InfTimePrimitiveFacade } from './inf-time-primitive.facade';
import { infTimePrimitiveReducers } from './inf-time-primitive.reducer';

fdescribe('InfTimePrimitive Facade', () => {
  let facade: InfTimePrimitiveFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(infFeatureKey, infTimePrimitiveReducers),
      ],
      providers: [InfTimePrimitiveFacade]
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

    facade = TestBed.inject(InfTimePrimitiveFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.timePrimitivesByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const input: InfTimePrimitive = { fk_class: 1, pk_entity: 11, calendar: 'gregorian', duration: '1 day', julian_day: 123123123 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getTimePrimitive.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
