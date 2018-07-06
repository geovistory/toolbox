import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass, ComUiContextConfig } from 'app/core';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = DfhClass;
interface MetaData {
  pkClass?: number;
  pkUiContext?: number;
  uiPropConfigs?: ComUiContextConfig[];
};
export type ClassUiContextAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassUiContextAPIActions {
  static readonly LOAD_CLASS_UI_CONTEXT = 'LOAD_CLASS_UI_CONTEXT';
  static readonly LOAD_STARTED = 'CLASS_UI_CONTEXT: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'CLASS_UI_CONTEXT: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'CLASS_UI_CONTEXT: LOAD_FAILED';

  static readonly UPDATE_UI_PROP_CONFIG = 'UPDATE_UI_PROP_CONFIG';
  static readonly UPDATE_UI_PROP_CONFIG_STARTED = 'UPDATE_UI_PROP_CONFIG_STARTED';
  static readonly UPDATE_UI_PROP_CONFIG_SUCCEEDED = 'UPDATE_UI_PROP_CONFIG_SUCCEEDED';
  static readonly UPDATE_UI_PROP_CONFIG_FAILED = 'UPDATE_UI_PROP_CONFIG_FAILED';


  @dispatch() loadClassUiContext = (): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.LOAD_CLASS_UI_CONTEXT,
    meta: {},
    payload: null,
  });

  @dispatch() loadStarted = (): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  @dispatch() loadSucceeded = (payload: Payload, pkUiContext:number): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.LOAD_SUCCEEDED,
    meta: {
      pkUiContext
    },
    payload,
  })

  @dispatch() loadFailed = (error): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })


  @dispatch() updateUiPropConfig = (uiPropConfigs: ComUiContextConfig[]): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG,
    meta: { uiPropConfigs },
    payload: null,
  });

  @dispatch() updateUiPropConfigStarted = (): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_STARTED,
    meta: null,
    payload: null,
  })

  @dispatch() updateUiPropConfigSucceeded = (uiPropConfigs: ComUiContextConfig[]): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_SUCCEEDED,
    meta: { uiPropConfigs },
    payload: null
  })

  @dispatch() updateUiPropConfigFailed = (error): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_FAILED,
    meta: null,
    payload: null,
    error,
  })



}
