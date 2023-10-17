import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { infRoot } from '../inf.config';
import { InfState } from '../inf.models';
import { InfLangStringFacade } from './inf-lang-string.facade';
import { infLangStringReducers } from './inf-lang-string.reducer';

fdescribe('InfLangString Facade', () => {
  let facade: InfLangStringFacade;
  let store: Store<InfState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(infRoot, infLangStringReducers),
      ],
      providers: [InfLangStringFacade]
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

    facade = TestBed.inject(InfLangStringFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.langStringsByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const input: InfLangString = { fk_class: 1, pk_entity: 11, fk_language: 1, quill_doc: {}, string: "" };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getLangString.byPkEntity$(11))
    expect(res).toEqual(input)
  });

})
