import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SysConfig } from '@kleiolab/lib-config';
import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProTextPropertyFacade } from './pro-text-property.facade';
import { proTextPropertyReducers } from './pro-text-property.reducer';

describe('ProTextProperty Facade', () => {
  let facade: ProTextPropertyFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ text_property: proTextPropertyReducers }) }))
      ],
      providers: [ProTextPropertyFacade]
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

    facade = TestBed.inject(ProTextPropertyFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.fksIndex$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a1: ProTextProperty = { pk_entity: 11, string: 'A', fk_project: 89, fk_language: 12, fk_dfh_class: 234, fk_dfh_property_domain: 567, fk_system_type: 7 };
    const a2: ProTextProperty = { pk_entity: 11, string: 'B', fk_project: 89, fk_language: 13, fk_dfh_class: 234, fk_dfh_property_domain: 567, fk_system_type: 7 };
    facade.loadSucceeded([a1, a2], "")
    const res = await firstValueFrom(facade.getTextProperty.byFks$(a1))
    expect(res).toEqual(a1)
    const res2 = await firstValueFrom(facade.getTextProperty.byFksWithoutLang$({ fk_project: 89, fk_language: 12, fk_dfh_class: 234, fk_dfh_property_domain: 567, fk_system_type: 7 }))
    expect(Object.keys(res2).length).toEqual(2)

  });

  it('should return projects label', async () => {
    const a1: ProTextProperty = { fk_project: 1, fk_language: 1, fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL, string: 'Project 1', fk_pro_project: 1 };
    facade.loadSucceeded([a1], "")
    const res = await firstValueFrom(facade.getProjectLabel(1))
    expect(res).toEqual('Project 1');
  });

  it('should return projects description', async () => {
    const a1: ProTextProperty = { fk_project: 1, fk_language: 1, fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION, string: 'Project 1 Description', fk_pro_project: 1 }
    facade.loadSucceeded([a1], "")
    const res = await firstValueFrom(facade.getProjectDescription(1))
    expect(res).toEqual('Project 1 Description')
  });

})
