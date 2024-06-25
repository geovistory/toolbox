import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, take, toArray } from 'rxjs';
import { IAppState } from '../../state.model';
import { dataFeatureKey } from '../data.feature.key';
import { DataState } from '../data.model';
import { ResolvedEffects } from './resolved.effects';
import { resolvedReducers } from './resolved.reducers';


describe('Resolved', () => {
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ resolved: resolvedReducers })),
        EffectsModule.forFeature(ResolvedEffects)
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
  it('should put emit resolved value and cleanup', async () => {
    store.dispatch({ type: 'X', meta: { removePending: 'uuid123', items: ['a'] } })
    const [res1, res2] = await firstValueFrom(store.select(s => s.data.resolved['uuid123']).pipe(take(2), toArray()))
    // emit value
    expect(res1.items[0]).toEqual('a')
    // cleanup
    expect(res2).toEqual(undefined)
  })


});
