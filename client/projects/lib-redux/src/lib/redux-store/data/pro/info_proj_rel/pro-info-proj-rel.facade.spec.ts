import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProInfoProjRelFacade } from './pro-info-proj-rel.facade';
import { proInfoProjRelReducers } from './pro-info-proj-rel.reducer';

describe('ProInfoProjRel Facade', () => {
  let facade: ProInfoProjRelFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ info_proj_rel: proInfoProjRelReducers }) }))
      ],
      providers: [ProInfoProjRelFacade]
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

    facade = TestBed.inject(ProInfoProjRelFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.fkProjectFkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: ProInfoProjRel = { pk_entity: 11, fk_entity: 123, fk_project: 1 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getInfoProjRel.byFkProjectPkEntity$(1, 123))
    expect(res).toEqual(a)
  });

})
