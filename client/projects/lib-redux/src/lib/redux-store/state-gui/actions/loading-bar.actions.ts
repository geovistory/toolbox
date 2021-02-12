import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = any;
interface MetaData { null };
export type LoadingBarAction = FluxStandardAction<Payload, undefined>;


/**
* This actions start, stop and complete the global loading bar
* using a SlimLoadingBarService instantiated within the loading-bar
* module.
*
* In order to show a loading bar in GUI, use the LoadingBarComponent
* exported by this module.
*/
@Injectable()
export class LoadingBarActions {
  static readonly START = 'LOADING_BAR_START';
  static readonly STOP = 'LOADING_BAR_STOP';
  static readonly COPMLETE = 'LOADING_BAR_COPMLETE';
  @dispatch() startLoading = (): LoadingBarAction => ({
    type: LoadingBarActions.START,
    meta: null,
    payload: null,
  })

  @dispatch() stopLoading = (): LoadingBarAction => ({
    type: LoadingBarActions.STOP,
    meta: null,
    payload: null
  })

  @dispatch() completeLoading = (): LoadingBarAction => ({
    type: LoadingBarActions.COPMLETE,
    meta: null,
    payload: null,
  })



}
