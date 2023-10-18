import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { sysFeatureKey } from "../sys.feature.key";
import { SysState } from "../sys.models";
import { SysSystemRelevantClassFacade } from './sys-system-relevant-class.facade';
import { sysSystemRelevantClassReducers } from './sys-system-relevant-class.reducer';

fdescribe('SysSystemRelevantClass Facade', () => {
  let facade: SysSystemRelevantClassFacade;
  let store: Store<SysState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(sysFeatureKey, sysSystemRelevantClassReducers),
      ],
      providers: [SysSystemRelevantClassFacade]
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

    facade = TestBed.inject(SysSystemRelevantClassFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.index$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a1: SysSystemRelevantClass = { required_by_sources: true, fk_class: 11, pk_entity: 22, required_by_entities: true };
    const a2: SysSystemRelevantClass = { required_by_sources: false, fk_class: 12, pk_entity: 23, required_by_entities: true };
    facade.loadSucceeded([a1, a2], "")
    const res = await firstValueFrom(facade.getSystemRelevantClass.byPkEntity$(22))
    expect(res).toEqual(a1)
    const res2 = await firstValueFrom(facade.getSystemRelevantClass.byFkClass$(11))
    expect(res2).toEqual({ 22: a1 })
    const res3 = await firstValueFrom(facade.getSystemRelevantClass.byRequired$(true))
    expect(res3).toEqual({ 22: a1, 23: a2 })
    const res4 = await firstValueFrom(facade.getSystemRelevantClass.byRequiredBySources$(true))
    expect(res4).toEqual({ 22: a1 })
    const res5 = await firstValueFrom(facade.getSystemRelevantClass.byRequiredBySources$(false))
    expect(res5).toEqual({ 23: a2 })
  });

})
