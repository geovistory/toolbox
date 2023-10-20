import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DfhLabel } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DfhState } from "../dfh.models";
import { DfhLabelFacade } from './dfh-label.facade';
import { dfhLabelByFksKey, dfhLabelReducers } from './dfh-label.reducer';

describe('DfhLabel Facade', () => {
  let facade: DfhLabelFacade;
  let store: Store<DfhState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ dfh: combineReducers({ label: dfhLabelReducers }) }))
      ],
      providers: [DfhLabelFacade]
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

    facade = TestBed.inject(DfhLabelFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.dfhLabel$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: DfhLabel = { fk_class: 11, fk_profile: 22, fk_project: 33, fk_property: 44, label: 'A', type: 'l', language: 'en' };
    const key = dfhLabelByFksKey(a)
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getDfhLabel.byFks(a))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getDfhLabel.byClass(11, 'l'))
    expect(res2).toEqual({ [key]: a })
    const res3 = await firstValueFrom(facade.getDfhLabel.byProperty(44, 'l'))
    expect(res3).toEqual({ [key]: a })
    const res4 = await firstValueFrom(facade.getDfhLabel.byProfile(22, 'l'))
    expect(res4).toEqual({ [key]: a })
  });

})
