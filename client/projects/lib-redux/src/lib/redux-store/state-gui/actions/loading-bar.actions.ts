import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = any;
interface MetaData { null };
export type LoadingBarAction = FluxStandardAction<Payload, undefined>;


/**
* This actions add or remove the count of running jobs
*/
@Injectable({
  providedIn: 'root'
})
export class LoadingBarActions {

  static readonly ADD_JOB = 'LOADING_BAR_ADD_JOB';
  static readonly REMOVE_JOB = 'LOADING_BAR_REMOVE_JOB';

  addJobAction: FluxStandardAction<any, any> = {
    type: LoadingBarActions.ADD_JOB,
    meta: null,
    payload: null,
  }
  removeJobAction = {
    type: LoadingBarActions.REMOVE_JOB,
    meta: null,
    payload: null
  }

  constructor(private store: Store) { }

  addJob = () => this.store.dispatch(this.addJobAction)

  removeJob = () => this.store.dispatch(this.removeJobAction)


}
