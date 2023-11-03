import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfAppellation } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { InfState } from "../inf.models";
import { InfAppellationFacade } from './inf-appellation.facade';
import { infAppellationReducers } from './inf-appellation.reducer';

describe('InfAppellation Facade', () => {
  let facade: InfAppellationFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ inf: combineReducers({ appellation: infAppellationReducers }) }))
      ],
      providers: [InfAppellationFacade]
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

    facade = TestBed.inject(InfAppellationFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.appellationsByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const a: InfAppellation = { fk_class: 1, pk_entity: 11, quill_doc: {}, string: 'Hello' };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getAppellation.byPkEntity$(11))
    expect(res).toEqual(a)
  });

})
