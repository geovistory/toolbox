import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatColumn } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DatState } from "../dat.models";
import { DatColumnFacade } from './dat-column.facade';
import { datColumnReducers } from './dat-column.reducer';

describe('DatColumn Facade', () => {
  let facade: DatColumnFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dat: datColumnReducers })),
      ],
      providers: [DatColumnFacade]
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

    facade = TestBed.inject(DatColumnFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item', async () => {
    const a: DatColumn = { pk_entity: 11, fk_digital: 22, fk_column_relationship_type: 1 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getColumn.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getColumn.byFkDigital$(22))
    expect(res2).toEqual({ 11: a })
  });

})
