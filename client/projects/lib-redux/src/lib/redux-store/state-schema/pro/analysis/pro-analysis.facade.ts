import { Injectable } from '@angular/core';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { proAnalysisActions } from './pro-analysis.actions';
import { getAnalysisByPkEntity, getAnalysisByPkEntityState } from './pro-analysis.selectors';

@Injectable()
export class ProAnalysisFacade extends CrudFacade<ProAnalysis> {

  // Loaders
  analysesByPkEntity$ = this.store.select(getAnalysisByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, proAnalysisActions)
  }

  getAnalysis = {
    byPkEntity$: (pkEntity: number) => this.store.select(getAnalysisByPkEntity(pkEntity))
  };
}
