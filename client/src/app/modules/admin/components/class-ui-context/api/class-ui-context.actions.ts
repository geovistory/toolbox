import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass, ComUiContextConfig } from 'app/core';
import { Container } from 'app/modules/admin/admin.models';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = DfhClass;
interface MetaData {
  pkClass?: number;
  pkUiContext?: number;
  uiPropConfigs?: ComUiContextConfig[];
  containerEnabled?: Container;
  containerDisabledProperties?: Container;
  containerDisabledFields?: Container;
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

  loadSucceeded = (containerEnabled: Container,
    containerDisabledProperties: Container,
    containerDisabledFields: Container): ClassUiContextAPIAction => ({
      type: ClassUiContextAPIActions.LOAD_SUCCEEDED,
      meta: {
        containerEnabled,
        containerDisabledProperties,
        containerDisabledFields
      },
      payload: null
    })

  loadFailed = (error): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })


  @dispatch() updateUiContextConfig = (uiPropConfigs: ComUiContextConfig[]): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG,
    meta: { uiPropConfigs },
    payload: null,
  });

  @dispatch() updateUiContextConfigStarted = (): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_STARTED,
    meta: null,
    payload: null,
  })

  @dispatch() updateUiContextConfigSucceeded = (uiPropConfigs: ComUiContextConfig[]): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_SUCCEEDED,
    meta: { uiPropConfigs },
    payload: null
  })

  @dispatch() updateUiContextConfigFailed = (error): ClassUiContextAPIAction => ({
    type: ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_FAILED,
    meta: null,
    payload: null,
    error,
  })



}
