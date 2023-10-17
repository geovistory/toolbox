import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { proFeatureKey } from "../pro.feature.key";
import { ProState } from "../pro.models";
import { ProProjectFacade } from './pro-project.facade';
import { proProjectReducers } from './pro-project.reducer';

fdescribe('ProProject Facade', () => {
  let facade: ProProjectFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(proFeatureKey, proProjectReducers),
      ],
      providers: [ProProjectFacade]
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

    facade = TestBed.inject(ProProjectFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.projectsByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const a: ProProject = { pk_entity: 11 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getProject.byPkEntity$(11))
    expect(res).toEqual(a)
  });

})
