import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { InfState } from "../inf.models";
import { InfDimensionFacade } from './inf-dimension.facade';
import { infDimensionReducers } from './inf-dimension.reducer';

describe('InfDimension Facade', () => {
  let facade: InfDimensionFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ inf: infDimensionReducers })),
      ],
      providers: [InfDimensionFacade]
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

    facade = TestBed.inject(InfDimensionFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.dimensionsByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const input: InfDimension = { fk_class: 1, pk_entity: 11, fk_measurement_unit: 1, numeric_value: 12.34 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getDimension.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
