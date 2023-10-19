import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { WarState } from "../war.models";
import { WarEntityPreviewFacade } from './war-entity-preview.facade';
import { warEntityPreviewReducers } from './war-entity-preview.reducer';

describe('WarEntityPreview Facade', () => {
  let facade: WarEntityPreviewFacade;
  let store: Store<WarState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, combineReducers({ war: warEntityPreviewReducers })),
      ],
      providers: [WarEntityPreviewFacade]
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

    facade = TestBed.inject(WarEntityPreviewFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.indexed$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: WarEntityPreview = { pk_entity: 11, project_id: 22, entity_label: 'A', fk_class: 33 };
    facade.loadSucceeded([a], "")
    const state = await firstValueFrom(store.select(s => s))
    console.log(state);
    const res = await firstValueFrom(facade.getEntityPreview.byProjectIdPkEntity$(22, 11))
    expect(res).toEqual(a)
  });

})
