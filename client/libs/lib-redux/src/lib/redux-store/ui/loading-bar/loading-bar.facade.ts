import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { LoadingBarActions } from './loading-bar.actions';
import { LoadingBarState } from './loading-bar.models';
import { loadingBarQuery } from './loading-bar.selectors';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = any;
export type LoadingBarAction = FluxStandardAction<Payload, undefined>;


/**
* This actions add or remove the count of running jobs
*/
@Injectable({
  providedIn: 'root'
})
export class LoadingBarFacade {

  loadingBarCount$ = this.store.select(loadingBarQuery.getRunningJobsCount)

  constructor(private store: Store<LoadingBarState>) { }

  addJob = () => this.store.dispatch(LoadingBarActions.ADD_JOB())

  removeJob = () => this.store.dispatch(LoadingBarActions.REMOVE_JOB())

}
