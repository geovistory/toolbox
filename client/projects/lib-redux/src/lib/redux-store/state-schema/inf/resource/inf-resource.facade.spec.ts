import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { infRoot } from '../inf.config';
import { InfState } from '../inf.models';
import { InfResourceFacade } from './inf-resource.facade';
import { infResourceReducers } from './inf-resource.reducer';

fdescribe('InfResource Facade', () => {
  let facade: InfResourceFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(infRoot, infResourceReducers),
      ],
      providers: [InfResourceFacade]
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

    facade = TestBed.inject(InfResourceFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.resourcesByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity and fkClass', async () => {
    const input: InfResource = { fk_class: 1, pk_entity: 11 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getResource.byPkEntity$(11))
    expect(res).toEqual(input)
    const res2 = await firstValueFrom(facade.getResource.byFkClass$(1))
    expect(res2).toEqual({ 11: input })
  });

})
