import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProProjectFacade } from './pro-project.facade';
import { proProjectReducers } from './pro-project.reducer';

describe('ProProject Facade', () => {
  let facade: ProProjectFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ project: proProjectReducers }) }))
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

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.projectsByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const a: ProProject = { pk_entity: 11 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getProject.byPkEntity$(11))
    expect(res).toEqual(a)
  });

  it('should return projects sorted by latest first', async () => {
    facade.loadSucceeded([
      { fk_language: 1, pk_entity: 1, tmsp_last_modification: "2020-01-01T12:00:00.000Z" },
      { fk_language: 2, pk_entity: 2, tmsp_last_modification: "2020-01-01T13:00:00.000Z" },
    ], '')
    const q = await firstValueFrom(facade.latestFirst$)
    expect(q[0].pk_entity).toEqual(2)
  });

})
