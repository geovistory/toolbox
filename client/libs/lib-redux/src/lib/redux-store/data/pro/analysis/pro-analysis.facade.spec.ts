import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { ProState } from "../pro.models";
import { ProAnalysisFacade } from './pro-analysis.facade';
import { proAnalysisReducers } from './pro-analysis.reducer';

describe('ProAnalysis Facade', () => {
  let facade: ProAnalysisFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ pro: combineReducers({ analysis: proAnalysisReducers }) }))
      ],
      providers: [ProAnalysisFacade]
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

    facade = TestBed.inject(ProAnalysisFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.analysesByPkEntity$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const a: ProAnalysis = { pk_entity: 11, analysis_definition: {}, fk_analysis_type: 1, fk_project: 1, name: 'A' };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getAnalysis.byPkEntity$(11))
    expect(res).toEqual(a)
  });

})
