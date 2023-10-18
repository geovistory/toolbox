import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatChunk } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { datFeatureKey } from "../dat.feature.key";
import { DatState } from "../dat.models";
import { DatChunkFacade } from './dat-chunk.facade';
import { datChunkReducers } from './dat-chunk.reducer';

fdescribe('DatChunk Facade', () => {
  let facade: DatChunkFacade;
  let store: Store<DatState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(datFeatureKey, datChunkReducers),
      ],
      providers: [DatChunkFacade]
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

    facade = TestBed.inject(DatChunkFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.pkEntityIndex$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const a: DatChunk = { pk_entity: 11, fk_text: 22, string: 'A', fk_namespace: 123, fk_entity_version: 1 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getChunk.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getChunk.byFkText$(22))
    expect(res2).toEqual({ 11: a })
  });

})
