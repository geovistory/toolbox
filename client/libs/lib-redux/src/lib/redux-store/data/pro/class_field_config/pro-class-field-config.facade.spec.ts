import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProClassFieldConfigFacade } from './pro-class-field-config.facade';
import { proClassFieldConfigReducers } from './pro-class-field-config.reducer';

describe('ProClassFieldConfig Facade', () => {
  let facade: ProClassFieldConfigFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ class_field_config: proClassFieldConfigReducers }) }))
      ],
      providers: [ProClassFieldConfigFacade]
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

    facade = TestBed.inject(ProClassFieldConfigFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.classFieldConfigByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const a: ProClassFieldConfig = { pk_entity: 11, fk_domain_class: 123, fk_project: 456 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getClassFieldConfig.byPkEntity$(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getClassFieldConfig.byFkClassFkProject$(a))
    expect(res2).toEqual({ 11: a })
  });

})
