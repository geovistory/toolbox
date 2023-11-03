import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DfhState } from "../dfh.models";
import { DfhProfileFacade } from './dfh-profile.facade';
import { dfhProfileReducers } from './dfh-profile.reducer';

describe('DfhProfile Facade', () => {
  let facade: DfhProfileFacade;
  let store: Store<DfhState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dfh: combineReducers({ profile: dfhProfileReducers }) }))
      ],
      providers: [DfhProfileFacade]
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

    facade = TestBed.inject(DfhProfileFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.dfhProfile$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: DfhProfile = { pk_profile: 11, date_profile_deprecated: 'foo' };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getDfhProfile.byProfile(11))
    expect(res).toEqual(a)
  });

})
