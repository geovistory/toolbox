import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { proFeatureKey } from "../pro.feature.key";
import { ProState } from "../pro.models";
import { ProAnalysisFacade } from './pro-analysis.facade';
import { proAnalysisReducers } from './pro-analysis.reducer';

fdescribe('ProAnalysis Facade', () => {
  let facade: ProAnalysisFacade;
  let store: Store<ProState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(proFeatureKey, proAnalysisReducers),
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

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.analysesByPkEntity$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const a: ProAnalysis = { pk_entity: 11, analysis_definition: {}, fk_analysis_type: 1, fk_project: 1, name: 'A' };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getAnalysis.byPkEntity$(11))
    expect(res).toEqual(a)
  });

})
