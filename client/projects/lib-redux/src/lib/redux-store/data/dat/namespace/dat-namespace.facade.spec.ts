import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatNamespace } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DatState } from "../dat.models";
import { DatNamespaceFacade } from './dat-namespace.facade';
import { datNamespaceReducers } from './dat-namespace.reducer';

describe('DatNamespace Facade', () => {
  let facade: DatNamespaceFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dat: datNamespaceReducers })),
      ],
      providers: [DatNamespaceFacade]
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

    facade = TestBed.inject(DatNamespaceFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item', async () => {
    const a: DatNamespace = { pk_entity: 11, fk_project: 22, standard_label: 'A', fk_root_namespace: 33 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getNamespace.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getNamespace.byFkProject$(22))
    expect(res2).toEqual({ 11: a })
  });

})
