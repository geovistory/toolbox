import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { IAppState } from '../../state.model';
import { dataFeatureKey } from '../data.feature.key';
import { DataState } from '../data.model';
import { pendingReducers } from './pending.reducers';


describe('Resolved', () => {
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pending: pendingReducers })),
      ],
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    store = TestBed.inject(Store);
  });
  it('should add and remove pending', async () => {
    store.dispatch({ type: 'X', meta: { addPending: 'uuid123', items: ['a'] } })
    const res = await firstValueFrom(store.select(s => s.data.pending['uuid123']))
    expect(res).toEqual(true)
    store.dispatch({ type: 'X', meta: { removePending: 'uuid123', items: ['a'] } })
    const res2 = await firstValueFrom(store.select(s => s.data.pending['uuid123']))
    expect(res2).toEqual(undefined)
  })

});
