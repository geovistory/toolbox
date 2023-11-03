import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProDfhProfileProjRelFacade } from './pro-dfh-profile-proj-rel.facade';
import { proDfhProfileProjRelReducers } from './pro-dfh-profile-proj-rel.reducer';

describe('ProDfhProfileProjRel Facade', () => {
  let facade: ProDfhProfileProjRelFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ dfh_profile_proj_rel: proDfhProfileProjRelReducers }) }))
      ],
      providers: [ProDfhProfileProjRelFacade]
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

    facade = TestBed.inject(ProDfhProfileProjRelFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.getDfhProfileProjRelByFkProjectFkClass$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find items', async () => {
    const a1: ProDfhProfileProjRel = { pk_entity: 11, fk_profile: 123, fk_project: 456, enabled: true };
    const a2: ProDfhProfileProjRel = { pk_entity: 12, fk_profile: 124, fk_project: 456, enabled: false };
    const a3: ProDfhProfileProjRel = { pk_entity: 13, fk_profile: 125, fk_project: 456, enabled: true };
    const a4: ProDfhProfileProjRel = { pk_entity: 11, fk_profile: 123, fk_project: 457, enabled: true };
    facade.loadSucceeded([a1, a2, a3, a4], "")
    const res = await firstValueFrom(facade.getDfhProfileProjRel.byFkProjectFkClass$(457, 123))
    expect(res).toEqual(a4)
    const res2 = await firstValueFrom(facade.getDfhProfileProjRel.byFkProjectEnabled$(456, true))
    expect(res2).toEqual({ '456_123': a1, '456_125': a3 })
  });

})
