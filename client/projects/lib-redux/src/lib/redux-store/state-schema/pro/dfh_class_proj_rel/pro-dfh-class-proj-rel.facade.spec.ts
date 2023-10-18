import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { proFeatureKey } from "../pro.feature.key";
import { ProState } from "../pro.models";
import { ProDfhClassProjRelFacade } from './pro-dfh-class-proj-rel.facade';
import { proDfhClassProjRelReducers } from './pro-dfh-class-proj-rel.reducer';

fdescribe('ProDfhClassProjRel Facade', () => {
  let facade: ProDfhClassProjRelFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(proFeatureKey, proDfhClassProjRelReducers),
      ],
      providers: [ProDfhClassProjRelFacade]
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

    facade = TestBed.inject(ProDfhClassProjRelFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.getDfhClassProjRelByFkProjectFkClass$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find items', async () => {
    const a1: ProDfhClassProjRel = { pk_entity: 11, fk_class: 123, fk_project: 456, enabled_in_entities: true };
    const a2: ProDfhClassProjRel = { pk_entity: 12, fk_class: 124, fk_project: 456, enabled_in_entities: false };
    const a3: ProDfhClassProjRel = { pk_entity: 13, fk_class: 125, fk_project: 456, enabled_in_entities: true };
    const a4: ProDfhClassProjRel = { pk_entity: 11, fk_class: 123, fk_project: 457, enabled_in_entities: true };
    facade.loadSucceeded([a1, a2, a3, a4], "")
    const res = await firstValueFrom(facade.getDfhClassProjRel.byFkProjectFkClass$(457, 123))
    expect(res).toEqual(a4)
    const res2 = await firstValueFrom(facade.getDfhClassProjRel.byFkProjectEnabledInEntities$(456, true))
    expect(res2).toEqual({ '456_123': a1, '456_125': a3 })
  });

})
