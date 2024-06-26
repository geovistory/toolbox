import { Injectable } from '@angular/core';
import { createAction } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = any;
export type LoadingBarAction = FluxStandardAction<Payload, undefined>;


/**
* This actions add or remove the count of running jobs
*/
@Injectable({
  providedIn: 'root'
})
export class LoadingBarActions {

  static readonly ADD_JOB = createAction('LOADING_BAR_ADD_JOB');
  static readonly REMOVE_JOB = createAction('LOADING_BAR_REMOVE_JOB');

  constructor() { }

}
