import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DfhClass } from '@kleiolab/lib-sdk-lb4/public-api';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dfhFeatureKey } from "../dfh.feature.key";
import { DfhState } from "../dfh.models";
import { DfhClassFacade } from './dfh-class.facade';
import { dfhClassReducers } from './dfh-class.reducer';

fdescribe('DfhClass Facade', () => {
  let facade: DfhClassFacade;
  let store: Store<DfhState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dfhFeatureKey, dfhClassReducers),
      ],
      providers: [DfhClassFacade]
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

    facade = TestBed.inject(DfhClassFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.dfhClass$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: DfhClass = { pk_class: 11, parent_classes: [], ancestor_classes: [], basic_type: 22 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getDfhClass.byPkClass$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getDfhClass.byBasicType$(22))
    expect(res2).toEqual({ 11: a })
  });

})
