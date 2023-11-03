import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DatState } from "../dat.models";
import { DatClassColumnMappingFacade } from './dat-class-column-mapping.facade';
import { datClassColumnMappingReducers } from './dat-class-column-mapping.reducer';

describe('DatClassColumnMapping Facade', () => {
  let facade: DatClassColumnMappingFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dat: combineReducers({ class_column_mapping: datClassColumnMappingReducers }) }))
      ],
      providers: [DatClassColumnMappingFacade]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot(),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(DatClassColumnMappingFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item', async () => {
    const a: DatClassColumnMapping = { pk_entity: 11, fk_column: 22, fk_class: 33 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getClassColumnMapping.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getClassColumnMapping.byFkColumn$(22))
    expect(res2).toEqual({ 11: a })
  });

})
