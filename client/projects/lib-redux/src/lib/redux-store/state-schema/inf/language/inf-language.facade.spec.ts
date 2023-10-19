import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { InfState } from "../inf.models";
import { InfLanguageFacade } from './inf-language.facade';
import { infLanguageReducers } from './inf-language.reducer';

describe('InfLanguage Facade', () => {
  let facade: InfLanguageFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ inf: infLanguageReducers })),
      ],
      providers: [InfLanguageFacade]
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

    facade = TestBed.inject(InfLanguageFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.languagesByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const input: InfLanguage = { fk_class: 1, pk_entity: 11, iso6391: "1" };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getLanguage.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
